import {
  getRelativeCoordinates,
  getCellPosition,
} from './../../../../shared/index.js'
import { EventEmitter } from './../EventEmitter.js'

export class CellHitManager extends EventEmitter {
  constructor(gameStateService) {
    super()
    this._gameStateService = gameStateService
  }

  processCellHit(event, cells, gridRect, cellSize) {
    const { x, y } = getRelativeCoordinates(event, gridRect)
    const { row, col, index } = getCellPosition(x, y, cellSize, 10)

    const isHit = this._gameStateService.hitCell(row, col)

    this.emit('cellHit', { cells, isHit, index })
  }
}
