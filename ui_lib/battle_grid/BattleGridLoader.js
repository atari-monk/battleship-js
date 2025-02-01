import { guiContener } from './../../client/script.js'
import { logger } from './../../data_lib/LogService.js'
import { BATTLE_GRID_CONFIG } from './../config.js'

export class BattleGridLoader {
  async load(dataService) {
    const { name, cssClass, id1, id2, hiddenStyle, loadBattleGridError } =
      BATTLE_GRID_CONFIG
    try {
      await guiContener.loadComponentResources(name)
      const battleGrid1 = guiContener.createInstance(
        name,
        cssClass,
        id1
      ).jsInstance
      const battleGrid2 = guiContener.createInstance(
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

      if (dataService.turn.currentPlayer === dataService.player1.name) {
        document.getElementById(id1).classList.add(hiddenStyle)
      }
      if (dataService.turn.currentPlayer === dataService.player2.name) {
        document.getElementById(id2).classList.add(hiddenStyle)
      }

      dataService.turn.printTurnInfo()
    } catch (error) {
      logger.error(loadBattleGridError, error)
    }
  }
}
