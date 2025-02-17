import { BATTLE_GRID } from './../config.js'
import { handleAction } from './../../../shared_lib/ui.js'

export class WinUIController {
  constructor(winManager, guiContainer) {
    this.guiContainer = guiContainer
    this.winManager = winManager

    this.winManager.on('gameWon', this.handleWin.bind(this))
  }

  handleWin({ winner }) {
    const { winMsg, waitOnReset, waitMsg, elements } = BATTLE_GRID

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
