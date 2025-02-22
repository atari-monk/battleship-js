//import { EVENT } from '../../shared_lib_2/constants.js'

export const FLEET_GRID_COMPONENT_CONFIG = {
  name: 'fleet_grid',
  cssClass: 'fleet-grid',
  selector: '.fleet-grid',
  elements: [{ elementId: 'fleet-grid-1' }],
  event: {
    startsWith: 'touch',
  },
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
  message: {
    init: 'Load component: fleet_grid',
  },
  error: { loader: 'Error in FleetGrid loader:' },
}
