import { EventHandler } from './EventHandler.js'
import { FleetService } from './FleetService.js'
import { PlacementHandler } from './PlacementHandler.js'
import { PlacementValidator } from './PlacementValidator.js'
import { ShipPreview } from './ShipPreview.js'
import { format } from './../../shared_lib/LogFormatter.js'
import { FLEET_GRID_CONFIG } from './../config.js'
import { BattleGridLoader } from './../battle_grid/BattleGridLoader.js'
import { ToggleGridsUIController } from './../battle_grid/action/ui/ToggleGridsUIController.js'
import { GridMetrics } from './../../ui_lib/grid/GridMetrics.js'
import { FLEET_GRID_CONFIG as Config2 } from './config.js'
import { GridCells } from './../grid/GridCells.js'

export class FleetGrid {
  set dataService(dataService) {
    this.fleetService.dataService = dataService
    this.placementHandler.dataService = dataService
  }

  constructor(guiContainer) {
    this.placementValidator = new PlacementValidator()
    this.shipPreview = new ShipPreview()
    this._gridMetric = new GridMetrics(Config2)
    this._gridCells = new GridCells(Config2)
    this.eventHandler = new EventHandler(this)
    this.fleetService = new FleetService(
      new BattleGridLoader(guiContainer),
      new ToggleGridsUIController()
    )
    this.placementHandler = new PlacementHandler(
      this._gridCells,
      this._gridMetric,
      this.placementValidator,
      this.shipPreview,
      this.fleetService
    )
  }

  paintOnHover(event) {
    this.placementHandler.paintOnHover(event, this.cells)
  }

  handleClick(event) {
    this.placementHandler.handleClick(event, this.cells)
  }

  handleWheel(event) {
    this.fleetService.isHorizontal =
      event.deltaY > 0 || event.deltaX > 0 ? false : true
    this.placementHandler.paintOnHover(event, this.cells)
  }

  init() {
    const { initMsg } = FLEET_GRID_CONFIG
    console.debug(...format.debug(initMsg))
    this._gridCells.generate('fleet-grid-1')
    this.cells = this._gridCells.cells
    this._gridMetric.setGridMetrics('fleet-grid-1')
    this.eventHandler.attachEvents()
  }
}
