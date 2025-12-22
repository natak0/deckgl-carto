import { Box } from '@mui/material';
import Map from './Map';
import { useState } from 'react';
import type { PointLayerConfig, TilesetLayerConfig } from '@/types/types';
import { SideBar } from '@/components/layout/sidebar/SideBar';
import { LayerControls } from '@/components/controls/LayerControls';
import { TILESET_COLOR_BY, TILESET_COLUMNS } from '@/types/types';

export function MapViewContainer() {
  const [pointConfig, setPointConfig] = useState<PointLayerConfig>({
    radius: 3,
    fillColor: [44, 162, 95, 180],
    outlineColor: [0, 0, 0, 200],
    outlineWidth: 1,
  });
  const [tilesetConfig, setTilesetConfig] = useState<TilesetLayerConfig>({
    colorPalette: TILESET_COLOR_BY[0],
    outlineColor: [80, 80, 80, 200],
    outlineWidth: 0.5,
    column: TILESET_COLUMNS[0],
  });

  return (
    <Box
      component="main"
      sx={{
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        position: 'relative',
      }}
    >
      <SideBar>
        <LayerControls
          pointConfig={pointConfig}
          tilesetConfig={tilesetConfig}
          onPointChange={setPointConfig}
          onTilesetChange={setTilesetConfig}
        />
      </SideBar>
      <Box
        component="div"
        sx={{
          flex: 1,
          position: 'relative',
        }}
      >
        <Map pointConfig={pointConfig} tilesetConfig={tilesetConfig} />
      </Box>
    </Box>
  );
}
