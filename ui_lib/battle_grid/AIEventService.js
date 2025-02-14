import { observeVisibilityChange } from '../../shared_lib/ui.js'

export class AIEventService {
  constructor(elementService, aiHitService, actionService) {
    this._elementService = elementService
    this._aiHitService = aiHitService
    this._actionService = actionService
  }

  setEvent(id, grid, cells) {
    return observeVisibilityChange(grid, () => {
      this._aiMove(id, cells)
    })
  }

  _aiMove(id, cells) {
    this._elementService.setElements(id)
    const { gridRect, cellSize } = this._elementService

    this._aiHitService.hitCell(cells, gridRect, cellSize)

    this._actionService.action()
  }
}
