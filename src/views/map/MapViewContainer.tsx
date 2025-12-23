import { Box, Tabs, Tab } from '@mui/material';
import Map from './Map';
import { useState } from 'react';
import type { PointLayerConfig, TilesetLayerConfig } from '@/types/types';
import { SideBar } from '@/components/layout/sidebar/SideBar';
import { LayerControls } from '@/components/controls/LayerControls';
import { TILESET_COLOR_BY, TILESET_COLUMNS } from '@/types/types';
import { WidgetControls } from '@/components/widgets/WidgetControls';
import type { CategoryResponse } from '@carto/api-client';

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
  const [revenueSum, setRevenueSum] = useState<number | null>(null);
  const [categories, setCategories] = useState<CategoryResponse>();

  type ControlTab = 'widgets' | 'controls';
  const [value, setValue] = useState<ControlTab>('widgets');

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue as ControlTab);
  };

  return (
    <Box
      component="main"
      sx={{
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        position: 'relative',
        backgroundColor: 'azure',
        color: '#213547',
      }}
    >
      <SideBar>
        <Box sx={{ width: '100%' }}>
          <Tabs value={value} onChange={handleChange} aria-label="map controls">
            <Tab value="widgets" label="Widgets" />
            <Tab value="controls" label="Controls" />
          </Tabs>
          {value === 'widgets' && (
            <WidgetControls revenueSum={revenueSum} categories={categories} />
          )}
          {value === 'controls' && (
            <LayerControls
              pointConfig={pointConfig}
              tilesetConfig={tilesetConfig}
              onPointChange={setPointConfig}
              onTilesetChange={setTilesetConfig}
            />
          )}
        </Box>
      </SideBar>
      <Box
        component="div"
        sx={{
          flex: 1,
          position: 'relative',
        }}
      >
        <Map
          pointConfig={pointConfig}
          tilesetConfig={tilesetConfig}
          onRevenueSumChange={setRevenueSum}
          onCategoriesChange={setCategories}
        />
      </Box>
    </Box>
  );
}
