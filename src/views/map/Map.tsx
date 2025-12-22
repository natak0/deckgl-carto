import maplibregl from 'maplibre-gl';
import { Deck } from '@deck.gl/core';
import { BASEMAP } from '@deck.gl/carto';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import type { MapViewState, PickingInfo } from '@deck.gl/core';
import { createVectorLayer } from './layers/createVectorLayer';
import type {
  PointLayerConfig,
  RetailStoreProperties,
  SocioDemographicsProperties,
  TilesetLayerConfig,
} from '@/types/types';

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

  const formatTooltip = useCallback(
    (
      props?: SocioDemographicsProperties | RetailStoreProperties
    ): string | null => {
      if (!props) return null;
      if ('store_id' in props) {
        return `Store ID: ${props.store_id}
                Type: ${props.storetype}
                Revenue: ${props.revenue}
                Size (m2): ${props.size_m2}
                Address: ${props.address}, ${props.city}, ${props.state} ${props.zip}`;
      }
      if ('geoid' in props) {
        return `GEOID: ${props.geoid}
                Total population: ${props.total_pop}
                Households: ${props.households}
                Median income: ${props.median_income}
                Income per capita: ${props.income_per_capita}`;
      }
      return null;
    },
    []
  );

  const getTooltip = useCallback(
    ({ object }: PickingInfo) => {
      const text = formatTooltip(
        object?.properties as
          | SocioDemographicsProperties
          | RetailStoreProperties
          | undefined
      );
      return text ? { text } : null;
    },
    [formatTooltip]
  );

  const layers = useMemo(
    () => createVectorLayer(pointConfig, tilesetConfig),
    [pointConfig, tilesetConfig, deckRef.current]
  );

  useEffect(() => {
    const deck = new Deck({
      canvas: deckCanvasRef.current!,
      initialViewState: INITIAL_VIEW_STATE,
      controller: true,
      getTooltip,
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
