import { BATTLE_GRID } from './config.js'
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
    const {  gridIds: [id1, id2], hiddenStyle } = BATTLE_GRID

    const activeGrid = isPlayer1 ? id1 : id2
    const inactiveGrid = isPlayer1 ? id2 : id1

    toggleGrid(activeGrid, true, hiddenStyle)
    toggleGrid(inactiveGrid, false, hiddenStyle)

    this._turn.printTurnInfo()
  }
}
