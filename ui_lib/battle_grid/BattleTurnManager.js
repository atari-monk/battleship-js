import { BATTLE_GRID } from './../config.js'
import { toggleGrid } from './../../shared_lib/ui.js'

export class BattleTurnManager {
  constructor(dataService) {
    this._dataService = dataService
    this.player1Name = dataService.player1.name
  }

  endTurn() {
    this._turn = this._dataService.turn
    this._turn.incrementTurn()

    const isPlayer1 = this._turn.currentPlayer === this.player1Name
    const { battleGrid1, battleGrid2, hiddenStyle } = BATTLE_GRID

    const activeGrid = isPlayer1 ? battleGrid1 : battleGrid2
    const inactiveGrid = isPlayer1 ? battleGrid2 : battleGrid1

    toggleGrid(activeGrid, true, hiddenStyle)
    toggleGrid(inactiveGrid, false, hiddenStyle)

    this._turn.printTurnInfo()
  }
}
