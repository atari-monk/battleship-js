import { format } from './../../shared_lib/LogFormatter.js'
import { TOGGLE_CONFIG } from './../config.js'

export class ToggleLoader {
  constructor(guiContainer) {
    this.guiContainer = guiContainer
  }

  async load() {
    const { name, cssClass, id, loadToggleError } = TOGGLE_CONFIG
    try {
      await this.guiContainer.loadComponentResources(name)
      this.guiContainer.createInstance(name, cssClass, id)
    } catch (error) {
      console.error(...format.error(loadToggleError, error))
    }
  }
}
