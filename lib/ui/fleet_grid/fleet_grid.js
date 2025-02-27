import { FleetGridComponent } from './FleetGridComponent.js'
import { ShipPreview } from './ShipPreview.js'
import { BattleGridLoader } from './../battle_grid/BattleGridLoader.js'
import { ToggleGridsUIController } from './../battle_grid/action/ui/ToggleGridsUIController.js'
import { GridMetrics } from './../grid/GridMetrics.js'
import { GridCells } from './../grid/GridCells.js'
import { PlacementValidator } from './PlacementValidator.js'
import { FleetService } from './FleetService.js'
import { EventAttacher } from './EventAttacher.js'
import { BATTLE_GRID_COMPONENT_CONFIG } from './../battle_grid/battle_grid_config.js'
import { FleetPaintOnHoverEventHandler } from './FleetPaintOnHoverEventHandler.js'
import { FleetPlacementClickEventHandler } from './FleetPlacementClickEventHandler.js'
import { FLEET_GRID_COMPONENT_CONFIG } from './fleet_grid_config.js'
import { GRID_CONFIG } from './../grid/grid_config.js'
import { TOGGLE_COMPONENT_CONFIG } from './../toggle/toggle_config.js'

export default function init({ serviceContainer, guiContainer } = {}) {
  const config = {
    grid: GRID_CONFIG,
    fleetGrid: FLEET_GRID_COMPONENT_CONFIG,
    toogle: TOGGLE_COMPONENT_CONFIG,
    battleGrid: BATTLE_GRID_COMPONENT_CONFIG,
  }

  const dataService = serviceContainer.getService('data_service')
  const gridMetrics = new GridMetrics(config.fleetGrid)
  const gridCells = new GridCells(config.fleetGrid)

  const placementValidator = new PlacementValidator(config.grid)
  const shipPreview = new ShipPreview(config.grid)

  const battleGridLoader = new BattleGridLoader(config.battleGrid, guiContainer)
  const toggleGridsUIController = new ToggleGridsUIController(config.battleGrid)

  const fleetService = new FleetService(
    config,
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
    config.fleetGrid,
    fleetService,
    placementValidator,
    shipPreview,
    gridMetrics,
    dataService
  )

  const eventAttacher = new EventAttacher(
    config.fleetGrid,
    gridCells,
    fleetService,
    {
      fleetPaintOnHoverEventHandler,
      fleetPlacementClickEventHandler,
    }
  )

  return new FleetGridComponent(
    config.fleetGrid,
    gridMetrics,
    gridCells,
    eventAttacher,
    fleetService,
    fleetPaintOnHoverEventHandler
  )
}
