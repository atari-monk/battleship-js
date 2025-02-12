export class GameStateService {
  constructor(dataService) {
    this._dataService = dataService
    this._turn = this._dataService.turn
  }

  hit(row, col) {
    return this._dataService
      .getBoard()
      .hit(row, col, this._dataService.getEnemyFleet())
  }
}
