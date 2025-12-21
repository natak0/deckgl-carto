export type Color = [number, number, number, number];

export type PointLayerConfig = {
  radius: number;
  fillColor?: Color;
  outlineColor?: Color;
  outlineWidth?: number;
  colorBy?: string;
};

export type TilesetLayerConfig = {
  fillColor?: 'SunsetDark' | 'PurpOr' | 'TealGrn';
  outlineColor: Color;
  outlineWidth: number;
  colorBy?: string;
};
