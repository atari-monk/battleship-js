export class GameStateService {
  constructor(config, dataService) {
    this._config = config
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
    const {
      actions: { win, endTurn },
    } = this._config

    return this._dataService.getBoard().isWin() ? win : endTurn
  }

  reset() {
    this._dataService.reset()
    this._dataService.initializeTurn()
  }
}
