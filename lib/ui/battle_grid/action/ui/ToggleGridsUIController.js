import { toggleGrids } from './../../../../shared/index.js'

export class ToggleGridsUIController {
  constructor(config) {
    this._config = config
  }

  toggleGrids(turnInfo) {
    const { currentPlayer, player1Name } = turnInfo
    const { elements, hiddenStyle } = this._config

    toggleGrids(
      currentPlayer,
      player1Name,
      elements.map((element) => element.elementId),
      hiddenStyle
    )
  }
}
