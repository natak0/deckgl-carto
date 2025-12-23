import {
  TILESET_COLUMNS,
  TILESET_COLOR_BY,
  type PointLayerConfig,
  type TilesetLayerConfig,
} from '@/types/types';
import { Box, Slider, Select, MenuItem, Divider } from '@mui/material';
import { useMemo } from 'react';

function hexToRgb(hex: string): [number, number, number] {
  const normalized = hex.replace('#', '');
  const r = parseInt(normalized.substring(0, 2), 16);
  const g = parseInt(normalized.substring(2, 4), 16);
  const b = parseInt(normalized.substring(4, 6), 16);
  return [r, g, b];
}

type LayerControlsProps = {
  pointConfig: PointLayerConfig;
  tilesetConfig: TilesetLayerConfig;
  onPointChange: (config: PointLayerConfig) => void;
  onTilesetChange: (config: TilesetLayerConfig) => void;
};

export function LayerControls({
  pointConfig,
  tilesetConfig,
  onPointChange,
  onTilesetChange,
}: LayerControlsProps) {
  const fillHex = useMemo(() => {
    if (!pointConfig.fillColor) return '#2ca25f';
    const [r, g, b, a = 255] = pointConfig.fillColor;
    const toHex = (n: number) => n.toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}${toHex(a)}`;
  }, [pointConfig.fillColor]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <h3>Stores (points)</h3>
      <span>Radius</span>
      <Slider
        aria-label="Scatter plot radius"
        value={pointConfig.radius}
        valueLabelDisplay="auto"
        step={1}
        marks
        min={1}
        max={10}
        onChange={(_, value) =>
          onPointChange({
            ...pointConfig,
            radius: Array.isArray(value) ? value[0] : value,
          })
        }
      />

      <span>Point fill color</span>
      <input
        type="color"
        id="color-picker"
        value={fillHex.slice(0, 7)}
        onChange={(e) => {
          const hex = e.target.value;
          const rgb = hexToRgb(hex);
          onPointChange({
            ...pointConfig,
            fillColor: [
              rgb[0],
              rgb[1],
              rgb[2],
              pointConfig.fillColor?.[3] ?? 255,
            ],
          });
        }}
      />

      <h3>Demographics (polygons)</h3>
      <Divider variant="middle" sx={{ margin: '10px 0' }} />

      <span>Fill color by</span>
      <Select
        value={tilesetConfig.column ? tilesetConfig.column : TILESET_COLUMNS[0]}
        onChange={(e) =>
          onTilesetChange({ ...tilesetConfig, column: e.target.value })
        }
        sx={{ backgroundColor: 'white' }}
      >
        {TILESET_COLUMNS.map((column) => (
          <MenuItem key={column} value={column}>
            {column}
          </MenuItem>
        ))}
      </Select>

      <Select
        value={
          tilesetConfig.colorPalette
            ? tilesetConfig.colorPalette
            : TILESET_COLOR_BY[0]
        }
        onChange={(e) =>
          onTilesetChange({ ...tilesetConfig, colorPalette: e.target.value })
        }
        sx={{ backgroundColor: 'white' }}
      >
        {TILESET_COLOR_BY.map((color) => (
          <MenuItem key={color} value={color}>
            {color}
          </MenuItem>
        ))}
      </Select>

      <Divider variant="middle" sx={{ margin: '10px 0' }} />
      <span>Stroke width</span>

      <Slider
        aria-label="Stroke width"
        value={tilesetConfig.outlineWidth}
        valueLabelDisplay="auto"
        step={0.5}
        marks
        min={0}
        max={4}
        onChange={(_, value) =>
          onTilesetChange({
            ...tilesetConfig,
            outlineWidth: Array.isArray(value) ? value[0] : value,
          })
        }
      />
    </Box>
  );
}
