import { BATTLE_GRID } from './../config.js'
import { selectElementOrThrow } from './../../shared_lib/ui.js'

export class ScreenCoordinates {
  constructor() {
    this.isSet = false
  }

  setElements() {
    if (this.isSet) return

    const { battleGrid1, battleGridCell, getSelector } = BATTLE_GRID

    const gridElement = selectElementOrThrow({
      selector: battleGrid1,
      isId: true,
    })

    const cellElement = selectElementOrThrow({
      selector: getSelector(battleGrid1, battleGridCell),
    })

    this.cellSize = cellElement.getBoundingClientRect()
    this.gridRect = gridElement.getBoundingClientRect()

    this.isSet = true
  }

  matrixToScreen(row, col) {
    return {
      x:
        this.gridRect.left +
        col * this.cellSize.width +
        this.cellSize.width / 2,
      y:
        this.gridRect.top +
        row * this.cellSize.height +
        this.cellSize.height / 2,
    }
  }
}
