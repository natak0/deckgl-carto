import maplibregl from 'maplibre-gl';
import { Deck } from '@deck.gl/core';
import { BASEMAP } from '@deck.gl/carto';
import { useEffect, useMemo, useRef } from 'react';
import type { MapViewState } from '@deck.gl/core';
import { createVectorLayer } from './layers/createVectorLayer';
import type { PointLayerConfig, TilesetLayerConfig } from '@/types/types';

const INITIAL_VIEW_STATE: MapViewState = {
  latitude: 39.8097343,
  longitude: -98.5556199,
  zoom: 4,
  bearing: 0,
  pitch: 30,
};

function Map({
  pointConfig,
  tilesetConfig,
}: {
  pointConfig: PointLayerConfig;
  tilesetConfig: TilesetLayerConfig;
}) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const deckCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const deckRef = useRef<Deck | null>(null);

  const layers = useMemo(
    () => createVectorLayer(pointConfig, tilesetConfig),
    [pointConfig, tilesetConfig, deckRef.current]
  );

  useEffect(() => {
    const deck = new Deck({
      canvas: deckCanvasRef.current!,
      initialViewState: INITIAL_VIEW_STATE,
      controller: true,
      layers: layers,
    });
    deckRef.current = deck;

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

  useEffect(() => {
    if (deckRef.current) {
      deckRef.current.setProps({ layers });
    }
  }, [layers]);

  return (
    <>
      <div id="map" ref={mapContainerRef} />
      <canvas id="deck-canvas" ref={deckCanvasRef} />
    </>
  );
}

export default Map;
