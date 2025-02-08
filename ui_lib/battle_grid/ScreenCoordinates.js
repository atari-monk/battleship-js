import { BATTLE_GRID_CONFIG } from './../config.js'

export class ScreenCoordinates {
  static matrixToScreenCoords(row, col) {
    const { battleGridCell, battleGrid1, getSelector } = BATTLE_GRID_CONFIG
    const cell = document.querySelector(
      getSelector(battleGrid1, battleGridCell)
    )
    const cellSize = cell.getBoundingClientRect()
    const container = document.getElementById(battleGrid1)
    const containerRect = container.getBoundingClientRect()

    const x = containerRect.left + col * cellSize.width + cellSize.width / 2
    const y = containerRect.top + row * cellSize.height + cellSize.height / 2

    return { x, y }
  }
}
