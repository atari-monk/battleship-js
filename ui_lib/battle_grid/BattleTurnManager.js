import { BATTLE_GRID } from './../config.js'
import { toggleGrid } from './utils.js'

export class BattleTurnManager {
  constructor(dataService) {
    this._turn = dataService.turn
    this.player1Name = dataService.player1.name
  }

  endTurn() {
    this._turn.incrementTurn()

    const isPlayer1 = this._turn.currentPlayer === this.player1Name
    const { battleGrid1, battleGrid2 } = BATTLE_GRID

    const activeGrid = isPlayer1 ? battleGrid1 : battleGrid2
    const inactiveGrid = isPlayer1 ? battleGrid2 : battleGrid1

    toggleGrid(activeGrid, true)
    toggleGrid(inactiveGrid, false)

    this._turn.printTurnInfo()
  }
}
