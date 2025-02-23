import { COLOR, generateGridArray } from './../../shared_lib_2/index.js'

export class FleetService {
  constructor(config, dataService, battleGridLoader, toggleGridsUIController) {
    this._config = config
    this._dataService = dataService
    this._battleGridLoader = battleGridLoader
    this._toggleGridsUIController = toggleGridsUIController

    const { GRID_SIZE, SHIP_SIZES } = config.grid
    this.shipSizes = SHIP_SIZES
    this.currentShipIndex = 0
    this.isHorizontal = true
    this.placedShips = new Set()
    this.gridArray = generateGridArray(GRID_SIZE)
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
        COLOR.BLUE
      )

      if (this.isHorizontal) {
        for (let i = 0; i < shipSize; i++) {
          this.placedShips.add(index + i)
        }
      } else {
        const { GRID_SIZE } = this._config.grid

        for (let i = 0; i < shipSize; i++) {
          this.placedShips.add(index + i * GRID_SIZE)
        }
      }

      this.addShipToGrid(index, shipSize)
      this.currentShipIndex++
      return true
    }
    return false
  }

  addShipToGrid(startIndex, shipSize) {
    const { GRID_SIZE } = this._config.grid

    const startRow = Math.floor((startIndex - 1) / GRID_SIZE)
    const startCol = (startIndex - 1) % GRID_SIZE

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
    this._dataService.player1.board.matrix = this.gridArray

    this.hideFleetGrid()

    await this._battleGridLoader.load(this._dataService)

    this._dataService.initializeTurn()

    const {
      turn: { currentPlayer },
      player1: { name },
    } = this._dataService

    this._toggleGridsUIController.toggleGrids({
      currentPlayer,
      player1Name: name,
    })
  }

  hideFleetGrid() {
    const { selector: selectorA, hide: hideA } = this._config.fleetGrid
    const { selector: selectorB, hide: hideB } = this._config.toogle

    document.querySelector(selectorA).classList.add(hideA)
    document.querySelector(selectorB).classList.add(hideB)
  }
}
