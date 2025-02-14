import { BATTLE_GRID } from './config.js'
import { handleAction } from './../../shared_lib/ui.js'

export class WinAction {
  constructor(guiContainer, gameStateService) {
    this._guiContainer = guiContainer
    this._gameStateService = gameStateService
  }

  win() {
    const { winMsg, waitOnReset, waitMsg } = BATTLE_GRID

    handleAction({
      logMessages: [
        winMsg(this._gameStateService.getcurrentPlayer()),
        waitMsg(waitOnReset),
      ],
      waitTime: waitOnReset,
      callback: () => {
        BATTLE_GRID.elements.forEach((element) =>
          this._guiContainer
            .getInstanceById(element.elementId)
            .jsInstance.reset()
        )

        this._gameStateService.reset()
      },
    })
  }
}
