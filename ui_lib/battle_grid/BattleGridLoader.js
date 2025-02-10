import { format } from './../../shared_lib/LogFormatter.js'
import { BATTLE_GRID } from './config.js'
import { toggleGrids } from './../../shared_lib/ui.js'

export class BattleGridLoader {
  constructor(guiContainer) {
    this._container = guiContainer
  }

  async load(dataService) {
    const {
      name,
      cssClass,
      gridIds: [id1, id2],
      loadBattleGridError,
    } = BATTLE_GRID

    try {
      await this._container.loadComponentResources(name)

      const battleGrid1 = this._container.createInstance(
        name,
        cssClass,
        id1
      ).jsInstance
      const battleGrid2 = this._container.createInstance(
        name,
        cssClass,
        id2
      ).jsInstance

      battleGrid1.init(id1, true)
      battleGrid2.init(id2)

      if (dataService && battleGrid1 && battleGrid2) {
        battleGrid1.generator.dataService = dataService
        battleGrid2.generator.dataService = dataService
      }
    } catch (error) {
      console.error(...format.error(loadBattleGridError, error))
    }
  }

  setVisability(dataService) {
    const { gridIds, hiddenStyle } = BATTLE_GRID
    toggleGrids(
      dataService.turn.currentPlayer,
      dataService.player1.name,
      gridIds,
      hiddenStyle
    )
  }
}
