import {
  COLOR,
  generateGridArray,
  convert1DArrayIndexTo2DArrayPosition,
} from './../../shared_lib/index.js'

export class FleetService {
  constructor(config, dataService, battleGridLoader, toggleGridsUIController) {
    this._config = config
    this._dataService = dataService
    this._battleGridLoader = battleGridLoader
    this._toggleGridsUIController = toggleGridsUIController

    const { GRID_SIZE, SHIP_SIZES } = config.grid
    this.gridSize = GRID_SIZE
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
      !placementValidator.validatePlacement(
        index,
        shipSize,
        this.isHorizontal,
        this.placedShips
      )
    )
      return false

    shipPreview.paintPreview(
      index,
      shipSize,
      this.isHorizontal,
      this.placedShips,
      gridItems,
      COLOR.BLUE
    )

    const { row: startRow, col: startCol } =
      convert1DArrayIndexTo2DArrayPosition(index, this.gridSize, 1)

    if (this.isHorizontal) {
      this._markHorizontalShip(index, shipSize)
      this._addHorizontalShipToGrid(startRow, startCol, shipSize)
    } else {
      this._markVerticalShip(index, shipSize)
      this._addVerticalShipToGrid(startRow, startCol, shipSize)
    }

    this.currentShipIndex++
    return true
  }

  isPlacementComplete() {
    return this.currentShipIndex >= this.shipSizes.length
  }

  async saveGridData() {
    this._dataService.player1.board.matrix = this.gridArray

    this._hideFleetGrid()

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

  _markHorizontalShip(index, shipSize) {
    for (let i = 0; i < shipSize; i++) {
      this.placedShips.add(index + i)
    }
  }

  _markVerticalShip(index, shipSize) {
    for (let i = 0; i < shipSize; i++) {
      this.placedShips.add(index + i * this.gridSize)
    }
  }

  _addHorizontalShipToGrid(startRow, startCol, shipSize) {
    for (let i = 0; i < shipSize; i++) {
      this.gridArray[startRow][startCol + i] = 1
    }
  }

  _addVerticalShipToGrid(startRow, startCol, shipSize) {
    for (let i = 0; i < shipSize; i++) {
      this.gridArray[startRow + i][startCol] = 1
    }
  }

  _hideFleetGrid() {
    const { selector: selectorA, hide: hideA } = this._config.fleetGrid
    const { selector: selectorB, hide: hideB } = this._config.toogle

    document.querySelector(selectorA).classList.add(hideA)
    document.querySelector(selectorB).classList.add(hideB)
  }
}
