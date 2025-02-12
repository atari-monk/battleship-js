import { BATTLE_GRID } from './config.js'
import { toggleGrids } from './../../shared_lib/ui.js'

export class BattleTurnManager {
  constructor(gameStateService) {
    this._gameStateService = gameStateService
  }

  endTurn() {
    const { currentPlayer, player1Name } = this._gameStateService.nextTurn()
    const { elementIds, hiddenStyle } = BATTLE_GRID
    toggleGrids(currentPlayer, player1Name, elementIds, hiddenStyle)
  }
}
