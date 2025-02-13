import { BATTLE_GRID } from './config.js'
import {
  getRelativeCoordinates,
  getCellPosition,
  updateColor,
} from './../../shared_lib/ui.js'

export class CellHitService {
  constructor(elementsService, gameStateService) {
    this._elementsService = elementsService
    this._gameStateService = gameStateService
  }

  hitCell(event, cells) {
    const { gridRect, cellSize } = this._elementsService
    const { attackCell } = this._gameStateService

    if (!gridRect || !cellSize) {
      throw new Error('Grid layout is not properly initialized.')
    }

    const { x, y } = getRelativeCoordinates(event, gridRect)
    const { row, col, index } = getCellPosition(x, y, cellSize)

    if (index < 0 || index >= cells.length) {
      throw new Error('Clicked outside of grid bounds.')
    }

    const cell = cells[index]
    if (!cell) throw new Error(BATTLE_GRID.cellError)

    const isHit = attackCell(row, col)

    updateColor({
      element: cell,
      isOn: isHit,
      isOnColor: BATTLE_GRID.color.red,
      isOffColor: BATTLE_GRID.color.grey,
    })
  }
}
