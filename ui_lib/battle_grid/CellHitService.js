import { BATTLE_GRID } from './config.js'
import {
  getRelativeCoordinates,
  getCellPosition,
  updateColor,
} from './../../shared_lib/ui.js'

export class CellHitService {
  constructor(gameStateService) {
    this._gameStateService = gameStateService
  }

  hitCell(event, cells, gridRect, cellSize) {
    const { x, y } = getRelativeCoordinates(event, gridRect)
    const { row, col, index } = getCellPosition(x, y, cellSize)

    if (index < 0 || index >= cells.length) {
      throw new Error('Clicked outside of grid bounds.')
    }

    const cell = cells[index]
    if (!cell) throw new Error(BATTLE_GRID.cellError)

    const isHit = this._gameStateService.attackCell(row, col)

    updateColor({
      element: cell,
      isOn: isHit,
      isOnColor: BATTLE_GRID.color.red,
      isOffColor: BATTLE_GRID.color.grey,
    })
  }
}
