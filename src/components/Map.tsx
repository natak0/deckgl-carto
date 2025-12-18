import maplibregl from 'maplibre-gl';
import { Deck } from '@deck.gl/core';
import { BASEMAP } from '@deck.gl/carto';
import { useEffect, useRef } from 'react';

interface State {
  latitude: number;
  longitude: number;
  zoom: number;
  bearing: number;
  pitch: number;
}

const INITIAL_VIEW_STATE: State = {
  latitude: 39.8097343,
  longitude: -98.5556199,
  zoom: 4,
  bearing: 0,
  pitch: 30,
};

function Map() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const deckCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const deck = new Deck({
      canvas: deckCanvasRef.current!,
      initialViewState: INITIAL_VIEW_STATE,
      controller: true,
    });

    const map = new maplibregl.Map({
      container: mapContainerRef.current!,
      style: BASEMAP.VOYAGER,
      interactive: false,
    });

    deck.setProps({
      onViewStateChange: ({ viewState }) => {
        const { longitude, latitude, ...rest } = viewState;
        map.jumpTo({ center: [longitude, latitude], ...rest });
      },
    });

    return () => {
      map.remove();
      deck.finalize();
    };
  }, []);

  return (
    <>
      <div id="map" ref={mapContainerRef} />
      <canvas id="deck-canvas" ref={deckCanvasRef} />
    </>
  );
}

export default Map;
