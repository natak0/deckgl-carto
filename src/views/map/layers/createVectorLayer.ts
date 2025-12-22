import {
  VectorTileLayer,
  colorBins,
  vectorQuerySource,
  vectorTableSource,
} from '@deck.gl/carto';
import type { Layer, PickingInfo } from '@deck.gl/core';
import { cartoConfig } from '@/config/config';
import type { PointLayerConfig, TilesetLayerConfig } from '@/types/types';

export function createVectorLayer(
  pointConfig: PointLayerConfig,
  tilesetConfig: TilesetLayerConfig,
  onHover?: (info: PickingInfo) => void
): Layer[] {
  const { radius, fillColor, outlineColor, outlineWidth } = pointConfig;
  const {
    column,
    colorPalette,
    outlineWidth: tilesetOutlineWidth,
  } = tilesetConfig;

  const pointSource = vectorTableSource({
    ...cartoConfig,
    tableName: 'carto-demo-data.demo_tables.retail_stores',
  });
  const tilesetSource = vectorQuerySource({
    ...cartoConfig,
    sqlQuery: `select total_pop, households, median_income, income_per_capita, g.geom as geom, g.geoid from \`carto-do-public-data.usa_acs.demographics_sociodemographics_usa_blockgroup_2015_5yrs_20142018\` d join \`carto-do-public-data.carto.geography_usa_blockgroup_2015\` g on d.geoid=g.geoid `,
  });

  const layers = [
    new VectorTileLayer({
      id: 'sociodemographics',
      data: tilesetSource,
      pickable: true,
      filled: true,
      stroked: true,
      opacity: 0.8,
      getFillColor: colorBins({
        attr: column,
        domain: [0, 0.01, 0.05, 0.1, 0.5, 1, 2, 5],
        colors: colorPalette,
      }),
      getLineColor: outlineColor,
      lineWidthMinPixels: tilesetOutlineWidth,
      onHover,
    }),
    new VectorTileLayer({
      id: 'retail-stores',
      data: pointSource,
      pointRadiusMinPixels: radius,
      getFillColor: fillColor,
      getLineColor: outlineColor,
      getLineWidth: outlineWidth,
      pickable: true,
      opacity: 1,
    }),
  ];
  return layers;
}
