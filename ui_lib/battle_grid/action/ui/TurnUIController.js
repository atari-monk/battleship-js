import { handleAction } from './../../../../shared_lib/index.js'

export class TurnUIController {
  constructor(config, turnManager, toggleGridsUIController) {
    this._config = config
    this.turnManager = turnManager
    this.toggleGridsUIController = toggleGridsUIController
    this.turnManager.on('turnChanged', this.handleTurnChange.bind(this))
  }

  handleTurnChange(turnInfo) {
    const { waitOnTurn, waitMsg } = this._config

    handleAction({
      logMessages: [waitMsg(waitOnTurn)],
      waitTime: waitOnTurn,
      callback: () => {
        this.toggleGridsUIController.toggleGrids(turnInfo)
      },
    })
  }
}
