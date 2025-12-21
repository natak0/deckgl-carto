import { Box } from '@mui/material';
import Map from './Map';
import { useState } from 'react';
import type { PointLayerConfig, TilesetLayerConfig } from '@/types/types';
import { SideBar } from '@/components/layout/sidebar/SideBar';
import { LayerControls } from '@/components/controls/LayerControls';

export function MapViewContainer() {
  const [pointConfig, setPointConfig] = useState<PointLayerConfig>({
    radius: 3,
    fillColor: [0, 128, 255, 180],
    outlineColor: [0, 0, 0, 200],
    outlineWidth: 1,
  });
  const [tilesetConfig, setTilesetConfig] = useState<TilesetLayerConfig>({
    fillColor: 'SunsetDark',
    outlineColor: [80, 80, 80, 200],
    outlineWidth: 1,
  });

  const columns: string[] = [];

  return (
    <Box
      component="div"
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
          columns={columns}
          onPointChange={setPointConfig}
          onTilesetChange={setTilesetConfig}
        />
      </SideBar>
      <Box
        component="main"
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
