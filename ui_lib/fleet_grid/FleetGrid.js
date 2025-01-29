import { EventHandler } from './EventHandler.js'
import { FleetService } from './FleetService.js'
import { GridRenderer } from './GridRenderer.js'
import { PlacementHandler } from './PlacementHandler.js'
import { PlacementValidator } from './PlacementValidator.js'
import { ShipPreview } from './ShipPreview.js'
import { logger } from './../../data_lib/LogService.js'

export class FleetGrid {
  set dataService(dataService) {
    this.fleetService.dataService = dataService
    this.placementHandler.dataService = dataService
  }

  constructor(config) {
    this.gridItems = null

    this.config = config
    this.placementValidator = new PlacementValidator()
    this.shipPreview = new ShipPreview()
    this.gridRenderer = new GridRenderer(config)
    this.eventHandler = new EventHandler(this)
    this.fleetService = new FleetService()
    this.placementHandler = new PlacementHandler(
      this.gridRenderer,
      this.placementValidator,
      this.shipPreview,
      this.fleetService,
      this.config
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
    this.gridRenderer.generateGridItems()
    this.gridItems = this.gridRenderer.getGridItems()
    this.eventHandler.attachEvents()
    logger.debug(this.config.message.initMsg)
  }
}
