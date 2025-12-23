# Deck.gl + CARTO React App

Summary

- Visualizes two datasets (retail stores as points, sociodemographics as polygons/tiles) with Deck.gl and CARTO.
- Provides UI controls to adjust fill color, outline, radius, and color-by-column for each layer.
- Shows tooltips on hover with feature attributes (stores and demographics).
- Supports widget-style metrics: revenue sum and store counts by store type for the visible viewport.
- Ready to deploy as a Vite React app.

How to run

1. Install deps: `npm install` (tested with stable version for node v22.14.0 (npm v11.7.0))
2. Set env vars for CARTO: `VITE_API_BASE_URL` and `VITE_API_ACCESS_TOKEN`
3. Start dev server: `npm run dev`

Key paths

- `src/views/map/Map.tsx`: Deck.gl + MapLibre setup and widget hooks
- `src/components/controls/LayerControls.tsx`: map style controls (Material UI)
- `src/components/widgets/WidgetControls.tsx`: revenue sum and store-type histogram (build with recharts)
- `src/views/map/widgets/createWidgets.ts`: widget data (formula + categories)
- `src/views/map/widgets/createVectorLayer.ts`: vector point and tileset layers
