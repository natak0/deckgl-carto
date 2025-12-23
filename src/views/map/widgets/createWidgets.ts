export async function createWidgets(
  dataSource: any,
  currentViewStatePolygon: any
) {
  if (!dataSource) return null;

  const formula = await dataSource.widgetSource.getFormula({
    column: 'revenue',
    operation: 'sum',
    spatialFilter: currentViewStatePolygon,
  });

  const revenueByStoretype = await dataSource.widgetSource.getCategories({
    column: 'storetype',
    operation: 'count',
    spatialFilter: currentViewStatePolygon,
  });

  return {
    formula,
    categories: revenueByStoretype,
  };
}
