import { BATTLE_GRID } from './config.js'

export class GameStateService {
  constructor(dataService) {
    this._dataService = dataService
  }

  getcurrentPlayer() {
    return this._dataService.turn.currentPlayer
  }

  hitCell(row, col) {
    return this._dataService
      .getBoard()
      .hit(row, col, this._dataService.getEnemyFleet())
  }

  aiTarget() {
    return this._dataService.playerAI.attack()
  }

  nextTurn() {
    const turn = this._dataService.turn
    turn.incrementTurn()
    turn.printTurnInfo()
    return {
      currentPlayer: turn.currentPlayer,
      player1Name: this._dataService.player1.name,
    }
  }

  nextAction() {
    return this._dataService.getBoard().isWin()
      ? BATTLE_GRID.actions.win
      : BATTLE_GRID.actions.endTurn
  }

  reset() {
    this._dataService.reset()
    this._dataService.initializeTurn()
  }
}
