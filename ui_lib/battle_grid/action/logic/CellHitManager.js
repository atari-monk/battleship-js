import {
  getRelativeCoordinates,
  getCellPosition,
} from './../../../../shared_lib/ui.js'
import { EventEmitter } from './../EventEmitter.js'

export class CellHitManager extends EventEmitter {
  constructor(gameStateService) {
    super()
    this._gameStateService = gameStateService
  }

  processCellHit(event, cells, gridRect, cellSize) {
    const { x, y } = getRelativeCoordinates(event, gridRect)
    const { row, col, index } = getCellPosition(x, y, cellSize)

    const isHit = this._gameStateService.attackCell(row, col)

    this.emit('cellHit', { cells, isHit, index })
  }
}
