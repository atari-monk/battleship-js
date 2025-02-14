import { format } from './../../shared_lib/LogFormatter.js'
import { BATTLE_GRID } from './config.js'
import { selectElementOrThrow, generateElements } from '../../shared_lib/ui.js'

export class BattleGrid {
  constructor(playerEventService, aiEventService) {
    this._playerEventService = playerEventService
    this._aiEventService = aiEventService
  }

  init(id, isAI = false) {
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

    const cells = document.querySelectorAll(getSelector(id, battleGridCell))

    this._setEventHandlers(isAI, id, grid, cells)
  }

  reset() {
    if (!this.cells) throw new Error(BATTLE_GRID.itemsError)

    this.cells.forEach((cell) => cell.removeAttribute('style'))

    this.isPlayerTurn = true
  }

  _setEventHandlers(isAI, id, grid, cells) {
    isAI
      ? this._aiEventService.setEvent(id, grid, cells)
      : this._playerEventService.setEvent(id, grid, cells)
  }
}
