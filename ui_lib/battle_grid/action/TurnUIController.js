import { BATTLE_GRID } from './../config.js'
import { handleAction, toggleGrids } from './../../../shared_lib/ui.js'

export class TurnUIController {
  constructor(turnManager) {
    this.turnManager = turnManager
    this.turnManager.on('turnChanged', this.handleTurnChange.bind(this))
  }

  handleTurnChange(turnInfo) {
    const { waitOnTurn, waitMsg, elements, hiddenStyle } = BATTLE_GRID

    handleAction({
      logMessages: [waitMsg(waitOnTurn)],
      waitTime: waitOnTurn,
      callback: () => {
        const { currentPlayer, player1Name } = turnInfo
        toggleGrids(
          currentPlayer,
          player1Name,
          elements.map((element) => element.elementId),
          hiddenStyle
        )
      },
    })
  }
}
