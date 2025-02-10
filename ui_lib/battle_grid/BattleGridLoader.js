import { format } from './../../shared_lib/LogFormatter.js'
import { BATTLE_GRID } from './config.js'

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
    const {
      gridIds: [id1, id2],
      hiddenStyle,
    } = BATTLE_GRID

    if (dataService.turn.currentPlayer === dataService.player1.name) {
      toggleGrid(id1, true, hiddenStyle)
    }
    if (dataService.turn.currentPlayer === dataService.player2.name) {
      toggleGrid(id2, true, hiddenStyle)
    }
  }
}
