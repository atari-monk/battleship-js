import { guiContener } from './../../client/script.js'
import { logger } from './../../data_lib/LogService.js'
import { EVENT, FULL_SCREEN, MENU_CONFIG } from './../config.js'

export class FullScreen {
  init() {
    logger.debug(FULL_SCREEN.initMsg)
    this.setButtonClick()
  }

  setButtonClick() {
    const { buttonId, notFoundWarn } = FULL_SCREEN
    const button = document.getElementById(buttonId)
    if (button) {
      button.addEventListener(EVENT.click, (event) => this.goFullScreen(event))
    } else {
      logger.warn(notFoundWarn(buttonId))
    }
  }

  async goFullScreen() {
    try {
      this.requestFullscreen()
      this.toggleVisibility(false)
      await this.showMenu()
    } catch (error) {
      logger.error(FULL_SCREEN.fullScreenError, error)
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
      logger.warn(FULL_SCREEN.fullscreenWarn)
    }
  }

  toggleVisibility(forceState) {
    const { rootSelector, hidden, notFoundWarn } = FULL_SCREEN
    const el = document.querySelector(rootSelector)

    if (!el) {
      logger.warn(notFoundWarn(rootSelector))
      return
    }

    if (typeof forceState === 'boolean') {
      if (forceState) {
        el.classList.remove(hidden)
      } else {
        el.classList.add(hidden)
      }
    } else {
      el.classList.toggle(hidden)
    }
  }

  async showMenu() {
    const { name, cssClass, id, showMenuError } = MENU_CONFIG
    try {
      await guiContener.loadComponentResources(name)
      guiContener.createInstance(name, cssClass, id)
    } catch (error) {
      logger.error(showMenuError, error)
    }
  }
}

export default function init() {
  const fs = new FullScreen()
  fs.init()
  return fs
}
