import { matrixToScreen } from './../../shared_lib/ui.js'

export class AIHitService {
  constructor(gameStateService, cellHitService) {
    this._gameStateService = gameStateService
    this._cellHitService = cellHitService
  }

  hitCell(cells, gridRect, cellSize) {
    const [x, y] = this._gameStateService.aiAttack()

    const event = matrixToScreen({ gridRect, cellSize, row: x, col: y })

    this._cellHitService.hitCell(event, cells, gridRect, cellSize)
  }
}
