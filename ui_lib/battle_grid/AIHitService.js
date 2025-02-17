import { matrixToScreen } from './../../shared_lib/ui.js'

export class AIHitService {
  constructor(gameStateService, cellHitManager) {
    this._gameStateService = gameStateService
    this._cellHitManager = cellHitManager
  }

  hitCell(cells, gridRect, cellSize) {
    const [x, y] = this._gameStateService.aiAttack()

    const event = matrixToScreen({ gridRect, cellSize, row: x, col: y })

    this._cellHitManager.processCellHit(event, cells, gridRect, cellSize)
  }
}
