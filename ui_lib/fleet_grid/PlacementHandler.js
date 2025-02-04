import { format } from './../../data_lib/LogService.js'
import { FLEET_GRID_CONFIG, COLOR, EVENT } from './../config.js'

export class PlacementHandler {
  set dataService(dataService) {
    this._dataService = dataService
  }

  constructor(gridRenderer, placementValidator, shipPreview, fleetService) {
    this.gridRenderer = gridRenderer
    this.placementValidator = placementValidator
    this.shipPreview = shipPreview
    this.fleetService = fleetService
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
        COLOR.green
      )
    } else {
      this.shipPreview.paintPreview(
        index,
        shipSize,
        this.fleetService.isHorizontal,
        this.fleetService.placedShips,
        gridItems,
        COLOR.red
      )
    }
  }

  handleClick(event, gridItems) {
    const { fleetGridGrid, player1Data } = FLEET_GRID_CONFIG
    const touch = event.touches ? event.touches[0] : event
    const index = this.getCellIndex(touch.clientX, touch.clientY)

    if (
      this.fleetService.validateAndPlaceShip(
        index,
        this.placementValidator,
        this.shipPreview,
        gridItems
      )
    ) {
      if (this.fleetService.isPlacementComplete()) {
        document
          .querySelector(fleetGridGrid)
          .removeEventListener(EVENT.click, this.handleClick.bind(this))

        this.fleetService.saveGridData()
        const fleet = this.fleetService.gridArray
          .map((row) => row.join(' '))
          .join('\n\t\t')

        console.debug(
          ...format.debug(player1Data(this._dataService.player1.name, fleet))
        )
      }
    }
  }

  getCellIndex(clientX, clientY) {
    return this.gridRenderer.getCellIndex(clientX, clientY)
  }
}
