import { selectElementOrThrow } from './../../shared_lib/ui.js'
import { BATTLE_GRID } from './config.js'

export class ElementService {
  constructor() {
    this.isSet = false
  }

  setElements(id) {
    if (this.isSet) return

    const { battleGridCell, getSelector } = BATTLE_GRID

    const gridElement = selectElementOrThrow({
      selector: id,
      isId: true,
    })

    const cellElement = selectElementOrThrow({
      selector: getSelector(id, battleGridCell),
    })

    this.cellSize = cellElement.getBoundingClientRect()
    this.gridRect = gridElement.getBoundingClientRect()

    this.isSet = true
  }
}
