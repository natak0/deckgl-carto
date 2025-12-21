import type { PointLayerConfig, TilesetLayerConfig } from '@/types/types';
import Slider from '@mui/material/Slider';
import { Box } from '@mui/material';

type LayerControlsProps = {
  pointConfig: PointLayerConfig;
  tilesetConfig: TilesetLayerConfig;
  columns: string[];
  onPointChange: (config: PointLayerConfig) => void;
  onTilesetChange: (config: TilesetLayerConfig) => void;
};

export function LayerControls({
  pointConfig,
  tilesetConfig,
  columns,
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
    </Box>
  );
}
