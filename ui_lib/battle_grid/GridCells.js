import { BATTLE_GRID } from './config.js'
import { selectElementOrThrow, generateElements } from '../../shared_lib/ui.js'

export class GridCells {
  constructor() {
    this.grid = {}
    this.cells = []
  }

  generate(id) {
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
    this.grid = grid
  }

  reset() {
    this._reset(this.cells)
  }

  _reset(cells) {
    if (!cells.length) throw new Error(BATTLE_GRID.itemsError)

    cells.forEach((cell) => cell.removeAttribute('style'))
  }
}
