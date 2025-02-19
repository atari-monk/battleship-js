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
import { EventHandler } from './EventHandler.js'

export default function init({ serviceContainer, guiContainer } = {}) {
  const gridMetrics = new GridMetrics(Config2)
  const gridCells = new GridCells(Config2)

  const placementValidator = new PlacementValidator()
  const shipPreview = new ShipPreview()

  const battleGridLoader = new BattleGridLoader(guiContainer)
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

  const eventHandler = new EventHandler()

  const fleetGrid = new FleetGrid({
    config: FLEET_GRID_CONFIG,
    gridMetrics,
    gridCells,
    eventHandler,
    fleetService,
    placementHandler,
  })

  eventHandler.setFleetGrid(fleetGrid)

  if (serviceContainer) {
    const dataService = serviceContainer.getServiceByName('data_service')
    fleetGrid.dataService = dataService
  }

  fleetGrid.init()
  return fleetGrid
}
