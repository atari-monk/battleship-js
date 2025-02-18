export const FLEET_GRID_CONFIG = {
  gridCells: {
    selector: (id, cssClass) => `#${id} .${cssClass}`,
    cssClass: {
      gridCssClass: 'fleet-grid__grid',
      cellCssClass: 'fleet-grid__item',
    },
    attribute: { style: 'style' },
    error: {
      emptyGridMetrics: 'GridMetrics is not properly initialized',
    },
  },
}
