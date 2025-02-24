import { convert2DArrayToScreenCoords } from './../../shared_lib_2/index.js'

export class AIHitService {
  constructor(gameStateService, cellHitManager) {
    this._gameStateService = gameStateService
    this._cellHitManager = cellHitManager
  }

  hitCell(cells, gridRect, cellSize) {
    const [x, y] = this._gameStateService.aiTarget()

    const event = convert2DArrayToScreenCoords({
      gridRect,
      cellSize,
      row: x,
      col: y,
    })

    this._cellHitManager.processCellHit(event, cells, gridRect, cellSize)
  }
}
