import { BATTLE_GRID } from './config.js'

export class AttackHandler {
  constructor(elementService, dataService) {
    this._elements = elementService
    this._dataService = dataService
  }

  attack(event, gridItems) {
    const { x, y } = this._getRelativeCoordinates(event)
    const cellIndex = this._getCellIndex(x, y)
    const cell = gridItems[cellIndex]

    if (cell) {
      this._handleAttack(cell, cellIndex)
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

  _getCellIndex(x, y) {
    const cellSize = this._elements.cellSize
    const col = Math.floor(x / cellSize.width)
    const row = Math.floor(y / cellSize.height)
    return row * 10 + col
  }

  _handleAttack(cell, cellIndex) {
    const isHit = this._checkHit(cellIndex)
    cell.style.backgroundColor = isHit
      ? BATTLE_GRID.color.red
      : BATTLE_GRID.color.grey
  }

  _checkHit(cellIndex) {
    const { row, col } = this._getRowColFromCellIndex(cellIndex)
    return this._dataService
      .getBoard()
      .hit(row, col, this._dataService.getEnemyFleet())
  }

  _getRowColFromCellIndex(cellIndex) {
    return {
      row: Math.floor(cellIndex / 10),
      col: cellIndex % 10,
    }
  }
}
