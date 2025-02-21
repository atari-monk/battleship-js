import { FleetGrid } from './FleetGrid.js'
import { ShipPreview } from './ShipPreview.js'
import { FLEET_GRID_CONFIG } from './../config.js'
import { BattleGridLoader } from './../battle_grid/BattleGridLoader.js'
import { ToggleGridsUIController } from './../battle_grid/action/ui/ToggleGridsUIController.js'
import { GridMetrics } from './../../ui_lib/grid/GridMetrics.js'
import { FLEET_GRID_CONFIG as Config2 } from './config.js'
import { GridCells } from './../grid/GridCells.js'
import { PlacementValidator } from './PlacementValidator.js'
import { FleetService } from './FleetService.js'
import { PlacementHandler } from './PlacementHandler.js'
import { EventAttacher } from './EventAttacher.js'
import { BATTLE_GRID_COMPONENT_CONFIG } from './../battle_grid/config.js'

export default function init({ serviceContainer, guiContainer } = {}) {
  const gridMetrics = new GridMetrics(Config2)
  const gridCells = new GridCells(Config2)

  const placementValidator = new PlacementValidator()
  const shipPreview = new ShipPreview()

  const battleGridLoader = new BattleGridLoader(
    BATTLE_GRID_COMPONENT_CONFIG,
    guiContainer
  )
  const toggleGridsUIController = new ToggleGridsUIController()

  const fleetService = new FleetService(
    battleGridLoader,
    toggleGridsUIController
  )

  const placementHandler = new PlacementHandler(
    gridCells,
    gridMetrics,
    placementValidator,
    shipPreview,
    fleetService
  )

  const eventAttacher = new EventAttacher(
    FLEET_GRID_CONFIG,
    gridCells,
    placementHandler,
    fleetService
  )

  const fleetGrid = new FleetGrid(
    FLEET_GRID_CONFIG,
    gridMetrics,
    gridCells,
    eventAttacher,
    fleetService,
    placementHandler
  )

  if (serviceContainer) {
    const dataService = serviceContainer.getServiceByName('data_service')
    fleetService.dataService = dataService
    placementHandler.dataService = dataService
  }

  return fleetGrid
}
