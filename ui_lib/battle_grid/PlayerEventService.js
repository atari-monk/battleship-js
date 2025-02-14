import { BATTLE_GRID } from './config.js'
import { setEventForElement } from '../../shared_lib/ui.js'

export class PlayerEventService {
  constructor(elementService, playerHitService, actionService) {
    this._elementService = elementService
    this._playerHitService = playerHitService
    this._actionService = actionService
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
    this._elementService.setElements(id)
    const { gridRect, cellSize } = this._elementService

    this._playerHitService.hitCell(event, cells, gridRect, cellSize)

    this._actionService.action()
  }
}
