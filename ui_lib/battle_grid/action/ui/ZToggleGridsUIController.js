import { BATTLE_GRID } from './../../config.js'
import { toggleGrids } from './../../../../shared_lib/ui.js'

export class ToggleGridsUIController {
  toggleGrids(turnInfo) {
    const { currentPlayer, player1Name } = turnInfo
    const { elements, hiddenStyle } = BATTLE_GRID

    toggleGrids(
      currentPlayer,
      player1Name,
      elements.map((element) => element.elementId),
      hiddenStyle
    )
  }
}
