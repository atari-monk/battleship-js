import { handleAction } from './../../../../shared/index.js'

export class WinUIController {
  constructor(config, winManager, guiContainer) {
    this._config = config
    this.guiContainer = guiContainer
    this.winManager = winManager

    this.winManager.on('gameWon', this.handleWin.bind(this))
  }

  handleWin({ winner }) {
    const { winMsg, waitOnReset, waitMsg, elements } = this._config

    handleAction({
      logMessages: [winMsg(winner), waitMsg(waitOnReset)],
      waitTime: waitOnReset,
      callback: () => {
        elements.forEach((element) => {
          this.guiContainer
            .getInstanceById(element.elementId)
            .jsInstance.reset()
        })
      },
    })
  }
}
