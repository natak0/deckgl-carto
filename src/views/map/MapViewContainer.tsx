import { Box } from '@mui/material';
import Map from './Map';
import { SideBar } from '../../components/layout/sidebar/SideBar';

export function MapViewContainer() {
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
        <div>
          <h1>Sidebar</h1>
        </div>
      </SideBar>
      <Box
        component="main"
        sx={{
          flex: 1,
          position: 'relative',
        }}
      >
        <Map />
      </Box>
    </Box>
  );
}
