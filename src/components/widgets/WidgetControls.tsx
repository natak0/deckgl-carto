import { Box, Typography } from '@mui/material';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
} from 'recharts';

type WidgetControlsProps = {
  revenueSum?: number | null;
  categories?: { name: string; value: number }[];
};

export function WidgetControls({
  revenueSum,
  categories,
}: WidgetControlsProps) {
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
      {categories && categories.length > 0 && (
        <Box sx={{ width: '100%', height: 240 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categories}>
              <XAxis dataKey="name" hide />
              <YAxis hide />
              <RechartsTooltip />
              <Bar dataKey="value" fill="#3398DB" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      )}
    </Box>
  );
}
