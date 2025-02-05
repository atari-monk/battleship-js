import { guiContener } from './../../client/script.js'
import { format } from './../../shared_lib/LogFormatter.js'
import { toggleClass } from './../../shared_lib/ui.js'
import { EVENT, FULL_SCREEN, MENU_CONFIG } from './../config.js'

export class FullScreen {
  init() {
    console.debug(...format.debug(FULL_SCREEN.initMsg))
    this.setButtonClick()
  }

  setButtonClick() {
    const { buttonId, notFoundWarn } = FULL_SCREEN
    const button = document.getElementById(buttonId)
    if (button) {
      button.addEventListener(EVENT.click, (event) => this.goFullScreen(event))
    } else {
      console.warn(...format.warn(notFoundWarn(buttonId)))
    }
  }

  async goFullScreen() {
    try {
      this.requestFullscreen()
      this.toggle()
      await this.showMenu()
    } catch (error) {
      console.error(...format.error(FULL_SCREEN.fullScreenError, error))
    }
  }

  requestFullscreen() {
    const el = document.documentElement
    const request =
      el.requestFullscreen ||
      el.mozRequestFullScreen ||
      el.webkitRequestFullscreen ||
      el.msRequestFullscreen

    if (request) {
      request.call(el)
    } else {
      console.warn(...format.warn(FULL_SCREEN.fullscreenWarn))
    }
  }

  toggle(forceState) {
    const { classSelector, hidden } = FULL_SCREEN
    toggleClass(classSelector, hidden, forceState)
  }

  async showMenu() {
    const { name, cssClass, id, showMenuError } = MENU_CONFIG
    try {
      await guiContener.loadComponentResources(name)
      guiContener.createInstance(name, cssClass, id)
    } catch (error) {
      console.error(...format.error(showMenuError, error))
    }
  }
}

export default function init() {
  const fs = new FullScreen()
  fs.init()
  return fs
}
