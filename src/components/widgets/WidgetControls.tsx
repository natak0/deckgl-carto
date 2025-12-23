import { Box, Typography } from '@mui/material';

export function WidgetControls({ revenueSum }: { revenueSum?: number | null }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box
        sx={{
          fontSize: 14,
          color: 'text.secondary',
          lineHeight: 1.4,
          marginTop: 2,
        }}
      >
        <Typography variant="body1">
          {revenueSum
            ? `The total revenue for visible area: ${revenueSum?.toLocaleString()}`
            : 'No revenue data available'}
        </Typography>
      </Box>
    </Box>
  );
}
