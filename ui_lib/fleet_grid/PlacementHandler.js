import { logger } from './../../data_lib/LogService.js'

export class PlacementHandler {
  set dataService(dataService) {
    this._dataService = dataService
  }

  constructor(
    gridRenderer,
    placementValidator,
    shipPreview,
    fleetService,
    config
  ) {
    this.gridRenderer = gridRenderer
    this.placementValidator = placementValidator
    this.shipPreview = shipPreview
    this.fleetService = fleetService
    this.config = config
    this.currentHoverPosition = null
  }

  paintOnHover(event, gridItems) {
    const touch = event.touches ? event.touches[0] : event
    const index = this.getCellIndex(touch.clientX, touch.clientY)
    const shipSize =
      this.fleetService.shipSizes[this.fleetService.currentShipIndex]

    this.currentHoverPosition = {
      clientX: touch.clientX,
      clientY: touch.clientY,
      touches: event.touches,
    }

    this.shipPreview.resetPreview(gridItems)

    if (
      this.placementValidator.validatePlacement(
        index,
        shipSize,
        this.fleetService.isHorizontal,
        this.fleetService.placedShips
      )
    ) {
      this.shipPreview.paintPreview(
        index,
        shipSize,
        this.fleetService.isHorizontal,
        this.fleetService.placedShips,
        gridItems,
        this.config.color.green
      )
    } else {
      this.shipPreview.paintPreview(
        index,
        shipSize,
        this.fleetService.isHorizontal,
        this.fleetService.placedShips,
        gridItems,
        this.config.color.red
      )
    }
  }

  handleClick(event, gridItems) {
    const touch = event.touches ? event.touches[0] : event
    const index = this.getCellIndex(touch.clientX, touch.clientY)

    if (
      this.fleetService.validateAndPlaceShip(
        index,
        this.placementValidator,
        this.shipPreview,
        gridItems,
        this.config
      )
    ) {
      if (this.fleetService.isPlacementComplete()) {
        document
          .querySelector('.fleet-grid__grid')
          .removeEventListener('click', this.handleClick.bind(this))

        this.fleetService.saveGridData()
        const fleet = this.fleetService.gridArray
          .map((row) => row.join(' '))
          .join('\n\t\t')
        logger.debug(
          this.config.message.player1Data(this._dataService.player1.name, fleet)
        )
      }
    }
  }

  getCellIndex(clientX, clientY) {
    return this.gridRenderer.getCellIndex(clientX, clientY)
  }
}
