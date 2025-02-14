import { BATTLE_GRID } from './config.js'
import { selectElementOrThrow } from './../../shared_lib/ui.js'

export class ElementService {
  constructor() {
    this.isSet = false
  }

  setElements(id) {
    if (this.isSet) return

    this.setBattleGrid(id)

    this.setGridCell(id)

    if (!this.gridRect || !this.cellSize) {
      throw new Error('Grid layout is not properly initialized.')
    }

    this.isSet = true
  }

  setBattleGrid(id) {
    const gridElement = selectElementOrThrow({
      selector: id,
      isId: true,
    })

    this.gridRect = gridElement.getBoundingClientRect()
  }

  setGridCell(id) {
    const { getSelector, battleGridCell } = BATTLE_GRID

    const cellElement = selectElementOrThrow({
      selector: getSelector(id, battleGridCell),
    })

    this.cellSize = cellElement.getBoundingClientRect()
  }
}
