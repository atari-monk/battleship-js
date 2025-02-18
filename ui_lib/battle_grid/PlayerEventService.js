import { BATTLE_GRID } from './config.js'
import { setEventForElement } from '../../shared_lib/ui.js'

export class PlayerEventService {
  constructor(gridMetrics, playerHitService, actionExecutor) {
    this._gridMetrics = gridMetrics
    this._playerHitService = playerHitService
    this._actionExecutor = actionExecutor
  }

  setEvent(id, grid, cells) {
    return setEventForElement({
      element: grid,
      eventType: BATTLE_GRID.event.click,
      handler: (event) => {
        this._move(id, event, cells)
      },
    })
  }

  _move(id, event, cells) {
    const { gridRect, cellSize } = this._gridMetrics.setGridMetrics(id)

    this._playerHitService.hitCell(event, cells, gridRect, cellSize)

    this._actionExecutor.execute()
  }
}
