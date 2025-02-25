import { format } from './../../shared_lib/index.js'

export class FleetGridComponent {
  constructor(
    config,
    gridMetrics,
    gridCells,
    eventAttacher,
    fleetService,
    fleetPaintOnHoverEventHandler
  ) {
    this._config = config
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

  _init() {
    const {
      message: { init },
      elements: [{ elementId }],
    } = this._config

    console.debug(format(init))

    this._gridCells.generate(elementId)

    this._gridMetric.setGridMetrics(elementId)

    this._eventAttacher.attachEvents()
  }
}
