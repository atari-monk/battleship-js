import { format } from './../../shared_lib/LogFormatter.js'

export class FleetGrid {
  //   set dataService(dataService) {
  //     this.fleetService.dataService = dataService
  //     this.placementHandler.dataService = dataService
  //   }

  constructor(
    config,
    gridMetrics,
    gridCells,
    eventAttacher,
    //eventHandler,
    fleetService,
    fleetPaintOnHoverEventHandler
  ) {
    this.config = config
    this._gridMetric = gridMetrics
    this._gridCells = gridCells
    this._eventAttacher = eventAttacher
    this._fleetService = fleetService
    this._fleetPaintOnHoverEventHandler = fleetPaintOnHoverEventHandler
    this._init()
  }

  toggleOrientation() {
    this._fleetService.toggleOrientation()
  }

  paintOnHover() {
    this._fleetPaintOnHoverEventHandler.handle(
      this._fleetPaintOnHoverEventHandler.currentHoverPosition,
      this._gridCells.cells
    )
  }

  //   handleClick(event) {
  //     this.placementHandler.handleClick(event, this.cells)
  //   }

  //   handleWheel(event) {
  //     this.fleetService.isHorizontal =
  //       event.deltaY > 0 || event.deltaX > 0 ? false : true
  //     this.placementHandler.paintOnHover(event, this.cells)
  //   }

  _init() {
    const { initMsg } = this.config

    console.debug(...format.debug(initMsg))

    this._gridCells.generate('fleet-grid-1')

    //this.cells = this._gridCells.cells
    this._gridMetric.setGridMetrics('fleet-grid-1')

    this._eventAttacher.attachEvents()
  }
}
