import { BATTLE_GRID } from './config.js'
import {
  getRelativeCoordinates,
  getCellPosition,
} from './../../shared_lib/ui.js'

/*
This class 
1. Handles attack 
I would say this is ui function but mixed with game state,
therefore it breaks SRP.
Conversions, game state, ui update
*/
export class AttackHandler {
  constructor(elementService, gameStateService) {
    this._elements = elementService
    this._gameStateService = gameStateService
  }

  attack(event, gridItems) {
    const { x, y } = getRelativeCoordinates(event, this._elements.gridRect)
    const { row, col, index } = getCellPosition(x, y, this._elements.cellSize)
    const cell = gridItems[index]
    if (!cell) throw new Error(BATTLE_GRID.cellError)
    cell.style.backgroundColor = this._gameStateService.hit(row, col)
      ? BATTLE_GRID.color.red
      : BATTLE_GRID.color.grey
  }
}
