import type {
  SpatialFilter,
  VectorTableSourceResponse,
  CategoryResponse,
} from '@carto/api-client';

export async function createWidgets(
  dataSource: VectorTableSourceResponse,
  currentViewStatePolygon: SpatialFilter
) {
  if (!dataSource || !dataSource.widgetSource) return null;

  const formula = await dataSource.widgetSource.getFormula({
    column: 'revenue',
    operation: 'sum',
    spatialFilter: currentViewStatePolygon,
  });

  const revenueByStoretype: CategoryResponse =
    await dataSource.widgetSource.getCategories({
      column: 'storetype',
      operation: 'count',
      spatialFilter: currentViewStatePolygon,
    });

  return {
    formula,
    categories: revenueByStoretype,
  };
}
