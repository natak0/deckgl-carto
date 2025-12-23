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

  return {
    formula,
  };
}
