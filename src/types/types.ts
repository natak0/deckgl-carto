import type { Feature, Point, Polygon } from 'geojson';

export type Color = [number, number, number, number];

export type RetailStoreProperties = {
  cartodb_id: number;
  storetype: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  store_id: number;
  revenue: number;
  size_m2: number;
};

export type SocioDemographicsProperties = {
  total_pop: number;
  households: number;
  median_income: number;
  income_per_capita: number;
  geoid: string;
};

export type RetailStoreFeature = Feature<Point, RetailStoreProperties>;
export type SocioDemographicsFeature = Feature<
  Polygon,
  SocioDemographicsProperties
>;

export type PointLayerConfig = {
  radius: number;
  fillColor?: Color;
  outlineColor?: Color;
  outlineWidth?: number;
  colorBy?: string;
};

export const TILESET_COLUMNS: string[] = [
  'total_pop',
  'households',
  'median_income',
  'income_per_capita',
];

export const TILESET_COLOR_BY: string[] = ['SunsetDark', 'PurpOr', 'TealGrn'];

export type TilesetLayerConfig = {
  outlineColor: Color;
  outlineWidth: number;
  colorPalette: (typeof TILESET_COLOR_BY)[number];
  column: (typeof TILESET_COLUMNS)[number];
};
