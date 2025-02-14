import { format } from './../../shared_lib/LogFormatter.js'
import { BATTLE_GRID } from './config.js'
import { selectElementOrThrow, generateElements } from '../../shared_lib/ui.js'

export class BattleGrid {
  constructor(eventService) {
    this._eventService = eventService
  }

  init(id) {
    console.debug(...format.debug(BATTLE_GRID.initMsg(id)))

    const { getSelector, battleGridGrid, battleGridCell } = BATTLE_GRID

    const grid = selectElementOrThrow({
      selector: getSelector(id, battleGridGrid),
      isId: false,
    })
    grid.innerHTML = ''

    generateElements({
      parentElement: grid,
      className: battleGridCell,
    })

    this.cells = document.querySelectorAll(getSelector(id, battleGridCell))

    this._eventService.setEvent(id, grid, this.cells)
  }

  reset() {
    if (!this.cells) throw new Error(BATTLE_GRID.itemsError)

    this.cells.forEach((cell) => cell.removeAttribute('style'))
  }
}
