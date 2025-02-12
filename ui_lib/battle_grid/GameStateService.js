export class GameStateService {
  constructor(dataService) {
    this._dataService = dataService
  }

  hit(row, col) {
    return this._dataService
      .getBoard()
      .hit(row, col, this._dataService.getEnemyFleet())
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
}
