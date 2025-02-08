import { BATTLE_GRID_CONFIG, COLOR } from './../config.js'

export class AttackHandler {
  constructor(dataService) {
    this.dataService = dataService
  }

  executeAttack(id, event, gridItems) {
    const container = document.getElementById(id)
    const rect = container.getBoundingClientRect()

    const x = event.x - rect.left
    const y = event.y - rect.top

    const cellIndex = this._getCellIndex(x, y, id)
    const cell = gridItems[cellIndex]

    if (cell) {
      this._handleAttack(cell, cellIndex)
    } else {
      throw new Error(BATTLE_GRID_CONFIG.cellError)
    }
  }

  _getCellIndex(x, y, id) {
    const { battleGridCell } = BATTLE_GRID_CONFIG
    const cellSize = document
      .querySelector(`#${id} .${battleGridCell}`)
      .getBoundingClientRect()
    const col = Math.floor(x / cellSize.width)
    const row = Math.floor(y / cellSize.height)
    return row * 10 + col
  }

  _handleAttack(cell, cellIndex) {
    const { red, grey } = COLOR
    const row = Math.floor(cellIndex / 10)
    const col = cellIndex % 10
    const board = this.dataService.getBoard()
    const fleet = this.dataService.getEnemyFleet()

    const isHit = board.hit(row, col, fleet)
    cell.style.backgroundColor = isHit ? red : grey
  }
}
