import { BATTLE_GRID } from './config.js'
import { handleAction, toggleGrids } from './../../shared_lib/ui.js'

export class EndTurnAction {
  constructor(gameStateService) {
    this._gameStateService = gameStateService
  }

  endTurn() {
    const { waitOnTurn, waitMsg, elementIds, hiddenStyle } = BATTLE_GRID

    handleAction({
      logMessages: [waitMsg(waitOnTurn)],
      waitTime: waitOnTurn,
      callback: () => {
        const { currentPlayer, player1Name } = this._gameStateService.nextTurn()

        toggleGrids(currentPlayer, player1Name, elementIds, hiddenStyle)
      },
    })
  }
}
