import { observeVisibilityChange } from '../../shared_lib/ui.js'

export class AIEventService {
  constructor(gridMetrics, aiHitService, actionExecutor) {
    this._gridMetrics = gridMetrics
    this._aiHitService = aiHitService
    this._actionExecutor = actionExecutor
  }

  setEvent(id, grid, cells) {
    return observeVisibilityChange(grid, () => {
      this._aiMove(id, cells)
    })
  }

  _aiMove(id, cells) {
    const { gridRect, cellSize } = this._gridMetrics.setGridMetrics(id)

    this._aiHitService.hitCell(cells, gridRect, cellSize)

    this._actionExecutor.execute()
  }
}
