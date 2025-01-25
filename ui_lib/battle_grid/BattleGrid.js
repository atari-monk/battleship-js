import { logger } from './../../data_lib/LogService.js'

export class BattleGrid {
  set dataService(dataService) {
    this._dataService = dataService
  }

  constructor(config, gridRenderer) {
    this.gridItems = null

    this.config = config
    this.gridRenderer = gridRenderer
  }

  init(id, isAI = false) {
    this.gridRenderer.generateGridItems(id, isAI)
    this.gridItems = this.gridRenderer.getGridItems()
    logger.debug(this.config.message.initMsg(id))
  }
}
