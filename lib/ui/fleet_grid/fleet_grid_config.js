export const FLEET_GRID_COMPONENT_CONFIG = {
  name: 'fleet_grid',
  cssClass: 'fleet-grid',
  selector: '.fleet-grid',
  hide: 'fleet-grid--hidden',
  css: {
    gridSelector: '.fleet-grid__grid',
    cell: 'fleet-grid__item',
  },
  elements: [{ elementId: 'fleet-grid-1' }],
  event: {
    startsWith: 'touch',
  },
  scripts: [
    'fleet_grid_config.js',
    'FleetService.js',
    'PlacementValidator.js',
    'ShipPreview.js',
    'EventAttacher.js',
    'FleetPaintOnHoverEventHandler.js',
    'FleetPlacementClickEventHandler.js',
    'FleetGridComponent.js',
  ],
  message: {
    init: 'Load component: fleet_grid',
    player1Data: (playerName, fleet) =>
      `7. Load data:\n\tPlayer 1 - '${playerName}'\n\tFleet:\n\t\t${fleet}`,
  },
  error: { loader: 'Error in FleetGrid loader:' },
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

/*
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
*/

/*
export const FLEET_GRID_CONFIG = {
  name: 'fleet_grid',
  fleetGrid: '.fleet-grid',
  fleetGridGrid: '.fleet-grid__grid',
  fleetGridCell: 'fleet-grid__item',
  hiddenStyle: 'fleet-grid--hidden',
  cssClass: 'fleet-grid',
  id: 'fleet-grid-1',
  scripts: [
    './../config.js',
    'FleetService.js',
    'PlacementValidator.js',
    'ShipPreview.js',
    'EventAttacher.js',
    'FleetPaintOnHoverEventHandler.js',
    'FleetPlacementClickEventHandler.js',
    'FleetGridComponent.js',
  ],
  events: [
    EVENT.mousemove,
    EVENT.mouseenter,
    EVENT.touchmove,
    EVENT.touchstart,
    EVENT.click,
    EVENT.wheel,
  ],
  handlerWarn: 'Handler for event not found',
  gridError: (selector) => `Container with selector ${selector} not found.`,
  itemsError: 'Grid items have not been generated yet.',
  player1Data: (playerName, fleet) =>
    `7. Load data:\n\tPlayer 1 - '${playerName}'\n\tFleet:\n\t\t${fleet}`,
  initMsg: 'Load component: fleet_grid',
  loadFleetGridError: 'Error in FleetGrid loader:',
}
*/
