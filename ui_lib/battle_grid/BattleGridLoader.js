import { guiContainer } from './../../client/script.js'
import { format } from './../../shared_lib/LogFormatter.js'
import { BATTLE_GRID } from './config.js'

export class BattleGridLoader {
  async load(dataService) {
    const {
      name,
      cssClass,
      gridIds: [id1, id2],
      loadBattleGridError,
    } = BATTLE_GRID
    try {
      await guiContainer.loadComponentResources(name)
      const battleGrid1 = guiContainer.createInstance(
        name,
        cssClass,
        id1
      ).jsInstance
      const battleGrid2 = guiContainer.createInstance(
        name,
        cssClass,
        id2
      ).jsInstance

      battleGrid1.init(id1, true)
      battleGrid2.init(id2)

      if (dataService && battleGrid1 && battleGrid2) {
        battleGrid1.gridRenderer.dataService = dataService
        battleGrid2.gridRenderer.dataService = dataService
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
      document.getElementById(id1).classList.add(hiddenStyle)
    }
    if (dataService.turn.currentPlayer === dataService.player2.name) {
      document.getElementById(id2).classList.add(hiddenStyle)
    }
  }
}
