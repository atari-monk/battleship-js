import { guiContener } from './../../client/script.js'
import { logger } from './../../data_lib/LogService.js'
import { TOGGLE_CONFIG } from './../config.js'

export class ToggleLoader {
  async load() {
    const { name, cssClass, id, loadToggleError } = TOGGLE_CONFIG
    try {
      await guiContener.loadComponentResources(name)
      guiContener.createInstance(name, cssClass, id)
    } catch (error) {
      logger.error(loadToggleError, error)
    }
  }
}
