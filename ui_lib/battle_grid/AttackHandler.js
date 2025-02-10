import { BATTLE_GRID, COLOR } from './../config.js'
import { selectElementOrThrow } from './../../shared_lib/ui.js'

export class AttackHandler {
  constructor(dataService) {
    this.dataService = dataService
    this.isSet = false
  }

  setElements(id) {
    if (this.isSet) return

    this.rect = selectElementOrThrow({
      selector: id,
      isId: true,
    }).getBoundingClientRect()

    this.cellSize = selectElementOrThrow({
      selector: `#${id} .${BATTLE_GRID.battleGridCell}`,
    }).getBoundingClientRect()

    this.isSet = true
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
    return {
      x: event.x - this.rect.left,
      y: event.y - this.rect.top,
    }
  }

  _getCellIndex(x, y) {
    const col = Math.floor(x / this.cellSize.width)
    const row = Math.floor(y / this.cellSize.height)
    return row * 10 + col
  }

  _handleAttack(cell, cellIndex) {
    const isHit = this._checkHit(cellIndex)
    cell.style.backgroundColor = isHit ? COLOR.red : COLOR.grey
  }

  _checkHit(cellIndex) {
    const { row, col } = this._getRowColFromCellIndex(cellIndex)
    return this.dataService
      .getBoard()
      .hit(row, col, this.dataService.getEnemyFleet())
  }

  _getRowColFromCellIndex(cellIndex) {
    return {
      row: Math.floor(cellIndex / 10),
      col: cellIndex % 10,
    }
  }
}
