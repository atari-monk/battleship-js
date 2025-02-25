import { format, EVENT, getCellPosition } from './../../shared/index.js'

export class FleetPlacementClickEventHandler {
  constructor(
    config,
    fleetService,
    placementValidator,
    shipPreview,
    gridMetric,
    dataService
  ) {
    this._config = config
    this.fleetService = fleetService
    this.placementValidator = placementValidator
    this.shipPreview = shipPreview
    this._gridMetric = gridMetric
    this._dataService = dataService
  }

  handle(event, gridItems) {
    const {
      css: { gridSelector },
      message: { player1Data },
    } = this._config

    const touch = event.touches ? event.touches[0] : event
    const { row, col, index } = this.getCellIndex(touch.clientX, touch.clientY)

    if (
      this.fleetService.validateAndPlaceShip(
        index,
        this.placementValidator,
        this.shipPreview,
        gridItems
      )
    ) {
      if (this.fleetService.isPlacementComplete()) {
        const element = document.querySelector(gridSelector)
        if (!element) throw new Error('Element not found')
        element.removeEventListener(EVENT.CLICK, this.handle.bind(this))

        this.fleetService.saveGridData()
        const fleet = this.fleetService.gridArray
          .map((row) => row.join(' '))
          .join('\n\t\t')

        console.debug(
          format(player1Data(this._dataService.player1.name, fleet))
        )
      }
    }
  }

  getCellIndex(clientX, clientY) {
    return getCellPosition(clientX, clientY, this._gridMetric.cellSize, 10, 1)
  }
}
