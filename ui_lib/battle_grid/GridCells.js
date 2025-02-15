import { BATTLE_GRID } from './config.js'
import { selectElementOrThrow, generateElements } from '../../shared_lib/ui.js'

export class GridCells {
  constructor() {
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
  }

  reset() {
    if (!this.cells.length) throw new Error(BATTLE_GRID.itemsError)

    this.cells.forEach((cell) => cell.removeAttribute('style'))
  }
}
