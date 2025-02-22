import { getCellPosition2 } from './../../shared_lib/ui.js'
import { format } from './../../shared_lib/LogFormatter.js'
import { FLEET_GRID_CONFIG } from './../config.js'
import { EVENT } from './../../shared_lib_2/index.js'

export class FleetPlacementClickEventHandler {
  constructor(
    fleetService,
    placementValidator,
    shipPreview,
    gridMetric,
    dataService
  ) {
    this.fleetService = fleetService
    this.placementValidator = placementValidator
    this.shipPreview = shipPreview
    this._gridMetric = gridMetric
    this._dataService = dataService
  }

  handle(event, gridItems) {
    const { fleetGridGrid, player1Data } = FLEET_GRID_CONFIG
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
        const element = document.querySelector(fleetGridGrid)
        if (!element) throw new Error('Element not found')
        element.removeEventListener(EVENT.CLICK, this.handle.bind(this))

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
    return getCellPosition2(clientX, clientY, this._gridMetric.cellSize)
  }
}
