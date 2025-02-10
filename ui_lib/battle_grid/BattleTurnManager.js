import { BATTLE_GRID } from './config.js'
import { toggleGrids } from './../../shared_lib/ui.js'

export class BattleTurnManager {
  constructor(dataService) {
    this._dataService = dataService
    this.player1Name = dataService.player1.name
  }

  endTurn() {
    this._turn = this._dataService.turn
    this._turn.incrementTurn()
    const { elementIds, hiddenStyle } = BATTLE_GRID
    toggleGrids(
      this._turn.currentPlayer,
      this.player1Name,
      elementIds,
      hiddenStyle
    )
    this._turn.printTurnInfo()
  }
}
