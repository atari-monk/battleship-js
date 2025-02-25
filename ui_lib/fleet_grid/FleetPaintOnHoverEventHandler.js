import { getCellPosition, COLOR } from './../../shared_lib/index.js'

export class FleetPaintOnHoverEventHandler {
  constructor(fleetService, placementValidator, shipPreview, gridMetric) {
    this.fleetService = fleetService
    this.placementValidator = placementValidator
    this.shipPreview = shipPreview
    this._gridMetric = gridMetric
    this.currentHoverPosition = null
  }

  handle(event, gridItems) {
    const touch = event.touches ? event.touches[0] : event
    const { row, col, index } = this.getCellIndex(touch.clientX, touch.clientY)
    const shipSize =
      this.fleetService.shipSizes[this.fleetService.currentShipIndex]

    this.currentHoverPosition = {
      clientX: touch.clientX,
      clientY: touch.clientY,
      touches: event.touches,
    }

    this.shipPreview.resetPreview(gridItems)

    const isValidPlacement = this.placementValidator.validatePlacement(
      index,
      shipSize,
      this.fleetService.isHorizontal,
      this.fleetService.placedShips
    )

    this.shipPreview.paintPreview(
      index,
      shipSize,
      this.fleetService.isHorizontal,
      this.fleetService.placedShips,
      gridItems,
      isValidPlacement ? COLOR.GREEN : COLOR.RED
    )
  }

  getCellIndex(clientX, clientY) {
    return getCellPosition(clientX, clientY, this._gridMetric.cellSize, 10, 1)
  }
}
