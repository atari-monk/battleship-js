import { guiContener } from './../../client/script.js'

export class FleetService {
  set dataService(dataService) {
    this._dataService = dataService
  }

  constructor(config, shipSizes = [5, 4, 3, 3, 2]) {
    this.config = config
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
        this.config.color.blue
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
    document
      .querySelector(this.config.dot(this.config.cssClass.fleetGrid))
      .classList.add(this.config.style.hidden)
    document
      .querySelector(this.config.dot(this.config.cssClass.toogle))
      .classList.add(this.config.style.hidden)
  }

  async loadBattleGrid() {
    await guiContener.loadComponentResources(this.config.component.battleGrid)
    const battleGrid1 = guiContener.createInstance(
      'battle_grid',
      'battle-grid',
      'battle-grid-1'
    ).jsInstance
    const battleGrid2 = guiContener.createInstance(
      'battle_grid',
      'battle-grid',
      'battle-grid-2'
    ).jsInstance
    battleGrid1.init('battle-grid-1', true)
    battleGrid2.init('battle-grid-2')
    if (this._dataService && battleGrid1 && battleGrid2) {
      battleGrid1.gridRenderer.dataService = this._dataService
      battleGrid2.gridRenderer.dataService = this._dataService
    }

    if (this._dataService.turn.currentPlayer === this._dataService.player1.name)
      document
        .getElementById('battle-grid-1')
        .classList.add('battle-grid--hidden')
    if (this._dataService.turn.currentPlayer === this._dataService.player2.name)
      document
        .getElementById('battle-grid-2')
        .classList.add('battle-grid--hidden')

    this._dataService.turn.printTurnInfo()
  }
}
