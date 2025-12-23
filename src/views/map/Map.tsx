import maplibregl from 'maplibre-gl';
import { Deck, WebMercatorViewport } from '@deck.gl/core';
import { BASEMAP, vectorQuerySource, vectorTableSource } from '@deck.gl/carto';
import { createViewportSpatialFilter } from '@carto/api-client';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { MapViewState, PickingInfo } from '@deck.gl/core';
import { createVectorLayer } from './layers/createVectorLayer';
import type {
  PointLayerConfig,
  RetailStoreProperties,
  SocioDemographicsProperties,
  TilesetLayerConfig,
} from '@/types/types';
import { cartoConfig } from '@/config/config';
import { createWidgets } from './widgets/createWidgets';
import { debounce } from './widgets/utils';

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
  onRevenueSumChange,
  onCategoriesChange,
}: {
  pointConfig: PointLayerConfig;
  tilesetConfig: TilesetLayerConfig;
  onRevenueSumChange?: (value: number | null) => void;
  onCategoriesChange?: (value: { name: string; value: number }[]) => void;
}) {
  const [dataSource, setDataSource] = useState<any>(null);
  const [, setRevenueSum] = useState<number | null>(null);
  const [, setCategories] = useState<any[]>([]);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const deckCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const deckRef = useRef<Deck | null>(null);
  const dataSourceRef = useRef<any>(null);
  const tilesetSourceRef = useRef<any>(null);

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

  const tilesetSource = vectorQuerySource({
    ...cartoConfig,
    sqlQuery: `select total_pop, households, median_income, income_per_capita, g.geom as geom, g.geoid from \`carto-do-public-data.usa_acs.demographics_sociodemographics_usa_blockgroup_2015_5yrs_20142018\` d join \`carto-do-public-data.carto.geography_usa_blockgroup_2015\` g on d.geoid=g.geoid `,
  });
  tilesetSourceRef.current = tilesetSource;

  const layers = useMemo(
    () =>
      createVectorLayer(pointConfig, tilesetConfig, dataSource, tilesetSource),
    [pointConfig, tilesetConfig, deckRef.current]
  );

  useEffect(() => {
    initSource();

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

    const handleViewStateChange = ({
      viewState,
    }: {
      viewState: MapViewState;
    }) => {
      const { longitude, latitude, ...rest } = viewState;
      map?.jumpTo({ center: [longitude, latitude], ...rest });
      debouncedUpdateSpatialFilter(viewState);
    };

    deck.setProps({
      onViewStateChange: handleViewStateChange,
    });

    return () => {
      map.remove();
      deck.finalize();
    };
  }, []);

  const initSource = async () => {
    const source = await vectorTableSource({
      ...cartoConfig,
      tableName: 'carto-demo-data.demo_tables.retail_stores',
    });
    setDataSource(source);
    dataSourceRef.current = source;

    const initialFilter = createViewportSpatialFilter(
      new WebMercatorViewport(INITIAL_VIEW_STATE).getBounds()
    );
    const initialWidgets = await createWidgets(source, initialFilter);
    const initialSum = initialWidgets?.formula?.value ?? null;
    setCategories(initialWidgets?.categories ?? []);
    setRevenueSum(initialSum);
    onRevenueSumChange?.(initialSum);
    onCategoriesChange?.(initialWidgets?.categories ?? []);
  };

  const debouncedUpdateSpatialFilter = debounce(
    async (viewState: MapViewState) => {
      const ds = dataSourceRef.current;
      if (!ds) return;
      const viewport = new WebMercatorViewport(viewState);
      const filter = createViewportSpatialFilter(viewport.getBounds());
      const widgets = await createWidgets(ds, filter);
      const sum = widgets?.formula?.value ?? null;
      setCategories(widgets?.categories ?? []);
      setRevenueSum(sum);
      onRevenueSumChange?.(sum);
      onCategoriesChange?.(widgets?.categories ?? []);
    },
    300
  );

  useEffect(() => {
    if (deckRef.current) {
      deckRef.current.setProps({
        layers,
      });
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
