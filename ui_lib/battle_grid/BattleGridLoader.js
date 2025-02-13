import { format } from './../../shared_lib/LogFormatter.js'
import { BATTLE_GRID } from './config.js'
import { toggleGrids } from './../../shared_lib/ui.js'
import { loadComponents } from './../../shared_lib/ui.js'

export class BattleGridLoader {
  constructor(guiContainer) {
    this._container = guiContainer
  }

  async load(dataService) {
    const { name, cssClass, elementIds, loadBattleGridError } = BATTLE_GRID

    try {
      const grids = await loadComponents({
        uiContainer: this._container,
        componentName: name,
        cssClass,
        elementIds,
      })

      grids.forEach((grid, index) => {
        const gridId = elementIds[index]
        const isAI = index === 0

        grid.init(gridId, isAI)
        grid.dataService = dataService
      })
    } catch (error) {
      console.error(...format.error(loadBattleGridError, error))
    }
  }

  setVisability(dataService) {
    const { elementIds, hiddenStyle } = BATTLE_GRID
    toggleGrids(
      dataService.turn.currentPlayer,
      dataService.player1.name,
      elementIds,
      hiddenStyle
    )
  }
}
