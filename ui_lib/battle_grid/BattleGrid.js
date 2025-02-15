import { format } from './../../shared_lib/LogFormatter.js'
import { BATTLE_GRID } from './config.js'

export class BattleGrid {
  constructor(gridCells, eventService) {
    this._girdCells = gridCells
    this._eventService = eventService
  }

  init(id) {
    console.debug(...format.debug(BATTLE_GRID.initMsg(id)))

    this._girdCells.generate(id)

    this._eventService.setEvent(id, grid, this.cells)
  }

  reset() {
    this._girdCells.reset()
  }
}
