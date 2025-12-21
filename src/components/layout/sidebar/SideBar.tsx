import { Box } from '@mui/material';

export function SideBar({ children }: { children: React.ReactNode }) {
  return (
    <Box
      component="aside"
      sx={{
        width: '20%',
        p: 2,
        overflowY: 'auto',
      }}
    >
      {children}
    </Box>
  );
}
