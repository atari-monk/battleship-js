import { FLEET_GRID_CONFIG, TOGGLE_CONFIG, COLOR } from './../config.js'

export class FleetService {
  set dataService(dataService) {
    this._dataService = dataService
  }

  constructor(battleGridLoader) {
    this.battleGridLoader = battleGridLoader
    this.shipSizes = [5, 4, 3, 3, 2]
    this.currentShipIndex = 0
    this.isHorizontal = true
    this.placedShips = new Set()
    this.gridArray = Array.from({ length: 10 }, () => Array(10).fill(0))
  }

  toggleOrientation() {
    this.isHorizontal = !this.isHorizontal
  }

  validateAndPlaceShip(index, placementValidator, shipPreview, gridItems) {
    const shipSize = this.shipSizes[this.currentShipIndex]

    if (
      placementValidator.validatePlacement(
        index,
        shipSize,
        this.isHorizontal,
        this.placedShips
      )
    ) {
      shipPreview.paintPreview(
        index,
        shipSize,
        this.isHorizontal,
        this.placedShips,
        gridItems,
        COLOR.blue
      )

      if (this.isHorizontal) {
        for (let i = 0; i < shipSize; i++) {
          this.placedShips.add(index + i)
        }
      } else {
        for (let i = 0; i < shipSize; i++) {
          this.placedShips.add(index + i * 10)
        }
      }

      this.addShipToGrid(index, shipSize)
      this.currentShipIndex++
      return true
    }
    return false
  }

  addShipToGrid(startIndex, shipSize) {
    const startRow = Math.floor((startIndex - 1) / 10)
    const startCol = (startIndex - 1) % 10

    if (this.isHorizontal) {
      for (let i = 0; i < shipSize; i++) {
        this.gridArray[startRow][startCol + i] = 1
      }
    } else {
      for (let i = 0; i < shipSize; i++) {
        this.gridArray[startRow + i][startCol] = 1
      }
    }
  }

  isPlacementComplete() {
    return this.currentShipIndex >= this.shipSizes.length
  }

  async saveGridData() {
    if (!this._dataService) {
      console.warn('FleetService dataService prop not found')
      return
    }
    this._dataService.player1.board.matrix = this.gridArray

    this.hideFleetGrid()

    this._dataService.initializeTurn()
    await this.battleGridLoader.load(this._dataService)
  }

  hideFleetGrid() {
    const { fleetGrid, hiddenStyle: hidden1 } = FLEET_GRID_CONFIG
    const { toogle, hiddenStyle: hidden2 } = TOGGLE_CONFIG
    document.querySelector(fleetGrid).classList.add(hidden1)
    document.querySelector(toogle).classList.add(hidden2)
  }
}
