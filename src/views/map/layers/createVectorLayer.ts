import {
  VectorTileLayer,
  colorBins,
  vectorQuerySource,
  vectorTableSource,
} from '@deck.gl/carto';
import type { Layer } from '@deck.gl/core';
import { cartoConfig } from '../../../config/config';

export function createVectorLayer(): Layer[] {
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
      id: 'retail-stores',
      data: pointSource,
      pointRadiusMinPixels: 3,
      getFillColor: [200, 0, 80],
      pickable: true,
    }),
    new VectorTileLayer({
      id: 'sociodemographics',
      data: tilesetSource,
      pickable: true,
      filled: true,
      stroked: true,
      getFillColor: colorBins({
        attr: 'total_pop',
        domain: [0, 0.01, 0.05, 0.1, 0.5, 1, 2, 5],
        colors: 'SunsetDark',
      }),
      getLineColor: [255, 255, 255, 60],
      lineWidthMinPixels: 0.5,
    }),
  ];
  return layers;
}
