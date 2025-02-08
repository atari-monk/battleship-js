import { BATTLE_GRID } from './../config.js'

export class BattleTurnManager {
  constructor(dataService) {
    this.dataService = dataService
  }

  endTurn() {
    const { battleGrid1, battleGrid2, hiddenStyle } = BATTLE_GRID
    this.dataService.turn.incrementTurn()
    this.dataService.turn.printTurnInfo()

    const currentPlayer = this.dataService.turn.currentPlayer
    const isPlayer1 = currentPlayer === this.dataService.player1.name

    document
      .getElementById(battleGrid1)
      .classList.toggle(hiddenStyle, isPlayer1)
    document
      .getElementById(battleGrid2)
      .classList.toggle(hiddenStyle, !isPlayer1)
  }
}
