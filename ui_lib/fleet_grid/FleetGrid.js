import { EventHandler } from './EventHandler.js'
import { FleetService } from './FleetService.js'
import { GridRenderer } from './GridRenderer.js'
import { PlacementHandler } from './PlacementHandler.js'
import { PlacementValidator } from './PlacementValidator.js'
import { ShipPreview } from './ShipPreview.js'
import { format } from './../../shared_lib/LogFormatter.js'
import { FLEET_GRID_CONFIG } from './../config.js'
import { BattleGridLoader } from './../battle_grid/BattleGridLoader.js'

export class FleetGrid {
  set dataService(dataService) {
    this.fleetService.dataService = dataService
    this.placementHandler.dataService = dataService
  }

  constructor(guiContainer) {
    this.gridItems = null

    this.placementValidator = new PlacementValidator()
    this.shipPreview = new ShipPreview()
    this.gridRenderer = new GridRenderer()
    this.eventHandler = new EventHandler(this)
    this.fleetService = new FleetService(new BattleGridLoader(guiContainer))
    this.placementHandler = new PlacementHandler(
      this.gridRenderer,
      this.placementValidator,
      this.shipPreview,
      this.fleetService
    )
  }

  paintOnHover(event) {
    this.placementHandler.paintOnHover(event, this.gridItems)
  }

  handleClick(event) {
    this.placementHandler.handleClick(event, this.gridItems)
  }

  handleWheel(event) {
    this.fleetService.isHorizontal =
      event.deltaY > 0 || event.deltaX > 0 ? false : true
    this.placementHandler.paintOnHover(event, this.gridItems)
  }

  init() {
    const { initMsg } = FLEET_GRID_CONFIG
    this.gridRenderer.generateGridItems()
    this.gridItems = this.gridRenderer.getGridItems()
    this.eventHandler.attachEvents()
    console.debug(...format.debug(initMsg))
  }
}
