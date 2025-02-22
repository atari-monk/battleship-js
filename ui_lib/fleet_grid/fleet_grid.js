import { FleetGridComponent } from './FleetGridComponent.js'
import { ShipPreview } from './ShipPreview.js'
import { BattleGridLoader } from './../battle_grid/BattleGridLoader.js'
import { ToggleGridsUIController } from './../battle_grid/action/ui/ToggleGridsUIController.js'
import { GridMetrics } from './../../ui_lib/grid/GridMetrics.js'
import { FLEET_GRID_CONFIG as Config2 } from './config.js'
import { GridCells } from './../grid/GridCells.js'
import { PlacementValidator } from './PlacementValidator.js'
import { FleetService } from './FleetService.js'
import { EventAttacher } from './EventAttacher.js'
import { BATTLE_GRID_COMPONENT_CONFIG } from './../battle_grid/config.js'
import { FleetPaintOnHoverEventHandler } from './FleetPaintOnHoverEventHandler.js'
import { FleetPlacementClickEventHandler } from './FleetPlacementClickEventHandler.js'
import { FLEET_GRID_COMPONENT_CONFIG } from './fleet_grid_config.js'
import { GRID_CONFIG } from './../grid/grid_config.js'
import { TOGGLE_COMPONENT_CONFIG } from './../toggle/toggle_config.js'

export default function init({ serviceContainer, guiContainer } = {}) {
  const dataService = serviceContainer.getServiceByName('data_service')
  const gridMetrics = new GridMetrics(Config2)
  const gridCells = new GridCells(Config2)

  const placementValidator = new PlacementValidator(GRID_CONFIG)
  const shipPreview = new ShipPreview(GRID_CONFIG)

  const battleGridLoader = new BattleGridLoader(
    BATTLE_GRID_COMPONENT_CONFIG,
    guiContainer
  )
  const toggleGridsUIController = new ToggleGridsUIController()

  const fleetService = new FleetService(
    {
      grid: GRID_CONFIG,
      fleetGrid: FLEET_GRID_COMPONENT_CONFIG,
      toogle: TOGGLE_COMPONENT_CONFIG,
    },
    dataService,
    battleGridLoader,
    toggleGridsUIController
  )
  fleetService.dataService = dataService

  const fleetPaintOnHoverEventHandler = new FleetPaintOnHoverEventHandler(
    fleetService,
    placementValidator,
    shipPreview,
    gridMetrics
  )

  const fleetPlacementClickEventHandler = new FleetPlacementClickEventHandler(
    fleetService,
    placementValidator,
    shipPreview,
    gridMetrics,
    dataService
  )

  const eventAttacher = new EventAttacher(
    FLEET_GRID_COMPONENT_CONFIG,
    gridCells,
    fleetService,
    {
      fleetPaintOnHoverEventHandler,
      fleetPlacementClickEventHandler,
    }
  )

  return new FleetGridComponent(
    FLEET_GRID_COMPONENT_CONFIG,
    gridMetrics,
    gridCells,
    eventAttacher,
    fleetService,
    fleetPaintOnHoverEventHandler
  )
}
