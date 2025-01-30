import { logger } from './../../data_lib/LogService.js'
import { BATTLE_GRID_CONFIG } from './config.js'

export class BattleGrid {
  set dataService(dataService) {
    this._dataService = dataService
  }

  constructor(gridRenderer) {
    this.gridItems = null
    this.gridRenderer = gridRenderer
  }

  init(id, isAI = false) {
    this.gridRenderer.generateGridItems(id, isAI)
    this.gridItems = this.gridRenderer.getGridItems()
    logger.debug(BATTLE_GRID_CONFIG.initMsg(id))
  }
}
