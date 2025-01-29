import { guiContener } from './../../client/script.js'
import {
  FLEET_GRID_CONFIG,
  TOGGLE_CONFIG,
  BATTLE_GRID_CONFIG,
  COLOR,
} from './config.js'

export class FleetService {
  set dataService(dataService) {
    this._dataService = dataService
  }

  constructor(shipSizes = [5, 4, 3, 3, 2]) {
    this.shipSizes = shipSizes
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
    if (!this._dataService) return
    this._dataService.player1.board.matrix = this.gridArray

    this.hideFleetGrid()

    this._dataService.initializeTurn()

    await this.loadBattleGrid()
  }

  hideFleetGrid() {
    const { fleetGrid, hiddenStyle: hidden1 } = FLEET_GRID_CONFIG
    const { toogle, hiddenStyle: hidden2 } = TOGGLE_CONFIG
    document.querySelector(fleetGrid).classList.add(hidden1)
    document.querySelector(toogle).classList.add(hidden2)
  }

  async loadBattleGrid() {
    const {
      battleGrid,
      battleGridClass,
      battleGridId1,
      battleGridId2,
      hiddenStyle,
    } = BATTLE_GRID_CONFIG
    await guiContener.loadComponentResources(battleGrid)
    const battleGrid1 = guiContener.createInstance(
      battleGrid,
      battleGridClass,
      battleGridId1
    ).jsInstance
    const battleGrid2 = guiContener.createInstance(
      battleGrid,
      battleGridClass,
      battleGridId2
    ).jsInstance
    battleGrid1.init(battleGridId1, true)
    battleGrid2.init(battleGridId2)
    if (this._dataService && battleGrid1 && battleGrid2) {
      battleGrid1.gridRenderer.dataService = this._dataService
      battleGrid2.gridRenderer.dataService = this._dataService
    }

    if (this._dataService.turn.currentPlayer === this._dataService.player1.name)
      document.getElementById(battleGridId1).classList.add(hiddenStyle)
    if (this._dataService.turn.currentPlayer === this._dataService.player2.name)
      document.getElementById(battleGridId2).classList.add(hiddenStyle)

    this._dataService.turn.printTurnInfo()
  }
}
