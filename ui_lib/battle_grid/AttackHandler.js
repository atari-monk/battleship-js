import { BATTLE_GRID } from './config.js'

export class AttackHandler {
  constructor(elementService, dataService) {
    this._elements = elementService
    this._dataService = dataService
  }

  attack(event, gridItems) {
    const { x, y } = this._getRelativeCoordinates(event)
    const { row, col, index } = this._getCellPosition(x, y)
    const cell = gridItems[index]

    if (cell) {
      this._handleAttack(cell, row, col)
    } else {
      throw new Error(BATTLE_GRID.cellError)
    }
  }

  _getRelativeCoordinates(event) {
    const rect = this._elements.gridRect
    return {
      x: event.x - rect.left,
      y: event.y - rect.top,
    }
  }

  _getCellPosition(x, y) {
    const cellSize = this._elements.cellSize
    const col = Math.floor(x / cellSize.width)
    const row = Math.floor(y / cellSize.height)
    return { row, col, index: row * 10 + col }
  }

  _handleAttack(cell, row, col) {
    const isHit = this._checkHit(row, col)
    cell.style.backgroundColor = isHit
      ? BATTLE_GRID.color.red
      : BATTLE_GRID.color.grey
  }

  _checkHit(row, col) {
    return this._dataService
      .getBoard()
      .hit(row, col, this._dataService.getEnemyFleet())
  }
}
