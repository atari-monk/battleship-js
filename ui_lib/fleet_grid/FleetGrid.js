import { format } from './../../shared_lib/LogFormatter.js'

export class FleetGrid {
  set dataService(dataService) {
    this.fleetService.dataService = dataService
    this.placementHandler.dataService = dataService
  }

  constructor({
    config,
    gridMetrics,
    gridCells,
    eventHandler,
    fleetService,
    placementHandler,
  } = {}) {
    this.config = config
    this._gridMetric = gridMetrics
    this._gridCells = gridCells
    this.eventHandler = eventHandler
    this.fleetService = fleetService
    this.placementHandler = placementHandler
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
    const { initMsg } = this.config
    console.debug(...format.debug(initMsg))
    this._gridCells.generate('fleet-grid-1')
    this.cells = this._gridCells.cells
    this._gridMetric.setGridMetrics('fleet-grid-1')
    this.eventHandler.attachEvents()
  }
}
