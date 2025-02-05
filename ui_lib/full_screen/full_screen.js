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
  constructor(uiContainer) {
    this.uiContainer = uiContainer
  }

  init() {
    console.debug(...format.debug(FULL_SCREEN.initMsg))
    setEvent({
      ...FULL_SCREEN_BUTTON,
      handler: async (event) => this.goFullScreen(event),
    })
  }

  async goFullScreen() {
    try {
      requestFullscreen()
      toggle({ ...FULL_SCREEN_HIDE })
      await showComponent({
        uiContainer: this.uiContainer,
        ...MENU_COMPONENT,
      })
    } catch (error) {
      console.error(...format.error(FULL_SCREEN.fullScreenError, error))
    }
  }
}

export default function init(uiContainer) {
  const fs = new FullScreen(uiContainer)
  fs.init()
  return fs
}
