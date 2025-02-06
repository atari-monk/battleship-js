import { guiContainer } from './../../client/script.js'
import { format } from './../../shared_lib/LogFormatter.js'
import { TOGGLE_CONFIG } from './../config.js'

export class ToggleLoader {
  async load() {
    const { name, cssClass, id, loadToggleError } = TOGGLE_CONFIG
    try {
      await guiContainer.loadComponentResources(name)
      guiContainer.createInstance(name, cssClass, id)
    } catch (error) {
      console.error(...format.error(loadToggleError, error))
    }
  }
}
