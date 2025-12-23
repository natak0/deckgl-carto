import {
  VectorTileLayer,
  colorBins,
  type TilejsonResult,
} from '@deck.gl/carto';
import type { Layer, PickingInfo } from '@deck.gl/core';
import type { PointLayerConfig, TilesetLayerConfig } from '@/types/types';

export function createVectorLayer(
  pointConfig: PointLayerConfig,
  tilesetConfig: TilesetLayerConfig,
  pointSource: TilejsonResult | Promise<TilejsonResult> | null,
  tilesetSource: TilejsonResult | Promise<TilejsonResult> | null,
  onHover?: (info: PickingInfo) => void
): Layer[] {
  const { radius, fillColor, outlineColor, outlineWidth } = pointConfig;
  const {
    column,
    colorPalette,
    outlineWidth: tilesetOutlineWidth,
  } = tilesetConfig;

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
