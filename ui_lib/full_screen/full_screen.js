import { format } from './../../shared_lib/LogFormatter.js'
import {
  FULL_SCREEN_HIDE,
  FULL_SCREEN_BUTTON,
  FULL_SCREEN,
  MENU_COMPONENT,
} from './../config.js'
import {
  toggle,
  setEvent,
  requestFullscreen,
  showComponent,
} from './../../shared_lib/ui.js'

export class FullScreen {
  constructor(guiContainer) {
    this.guiContainer = guiContainer
  }

  init() {
    console.debug(...format.debug(FULL_SCREEN.initMsg))
    setEvent({
      ...FULL_SCREEN_BUTTON,
      handler: async (event) => this.requestFullscreen(event),
    })
  }

  async requestFullscreen() {
    try {
      toggle({ ...FULL_SCREEN_HIDE })

      requestFullscreen()

      await showComponent({
        uiContainer: this.guiContainer,
        ...MENU_COMPONENT,
      })
    } catch (error) {
      console.error(...format.error(FULL_SCREEN.fullScreenError, error))
    }
  }
}

export default function init({ serviceContainer, guiContainer } = {}) {
  const fs = new FullScreen(guiContainer)
  fs.init()
  return fs
}
