import { EVENT } from './../../shared_lib/index.js'

export class PlayerEventService {
  constructor(gridMetrics, playerHitService, actionExecutor) {
    this._gridMetrics = gridMetrics
    this._playerHitService = playerHitService
    this._actionExecutor = actionExecutor
  }

  setEvent(id, grid, cells) {
    grid.addEventListener(
      EVENT.CLICK,
      (event) => this._move(id, event, cells),
      { passive: true }
    )
  }

  _move(id, event, cells) {
    const { gridRect, cellSize } = this._gridMetrics.setGridMetrics(id)

    this._playerHitService.hitCell(event, cells, gridRect, cellSize)

    this._actionExecutor.execute()
  }
}
