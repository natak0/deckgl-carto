import {
  TILESET_COLUMNS,
  TILESET_COLOR_BY,
  type PointLayerConfig,
  type TilesetLayerConfig,
} from '@/types/types';
import { Box, Slider, Select, MenuItem, Divider } from '@mui/material';

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

      <span>Color palette</span>
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
