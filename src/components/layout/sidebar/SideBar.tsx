import { Box } from '@mui/material';

export function SideBar({ children }: { children: React.ReactNode }) {
  return (
    <Box
      component="aside"
      id="story-card"
      sx={{
        padding: '1.75rem',
        zIndex: 1,
        margin: '1.5rem',
        width: '20%',
        maxWidth: '480px',
        maxHeight: '100vh',
        overflow: 'scroll',
      }}
    >
      {children}
    </Box>
  );
}
