import { BATTLE_GRID } from './../../config.js'
import { handleAction } from './../../../../shared_lib/ui.js'

export class TurnUIController {
  constructor(turnManager, toggleGridsUIController) {
    this.turnManager = turnManager
    this.toggleGridsUIController = toggleGridsUIController
    this.turnManager.on('turnChanged', this.handleTurnChange.bind(this))
  }

  handleTurnChange(turnInfo) {
    const { waitOnTurn, waitMsg } = BATTLE_GRID

    handleAction({
      logMessages: [waitMsg(waitOnTurn)],
      waitTime: waitOnTurn,
      callback: () => {
        this.toggleGridsUIController.toggleGrids(turnInfo)
      },
    })
  }
}
