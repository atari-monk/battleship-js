import { BATTLE_GRID } from './../config.js'

export class ScreenCoordinates {
  constructor() {
    this.isSet = false
  }

  setElements() {
    if (this.isSet) {
      return
    } else {
      this.isSet = true
    }
    const { battleGrid1, battleGridCell, getSelector } = BATTLE_GRID
    const gridElement = document.getElementById(battleGrid1)
    if (!gridElement) {
      throw new Error('Battle grid element not found!')
    }
    const cellElement = document.querySelector(
      getSelector(battleGrid1, battleGridCell)
    )
    if (!cellElement) {
      throw new Error('Cell element not found!')
    }
    this.cellSize = cellElement.getBoundingClientRect()
    this.gridRect = gridElement.getBoundingClientRect()
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
