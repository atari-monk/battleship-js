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
      this.hide()
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

  hide() {
    const { rootSelector, hidden, notFoundWarn } = FULL_SCREEN
    const el = document.querySelector(rootSelector)
    if (el) {
      el.classList.add(hidden)
    } else {
      logger.warn(notFoundWarn(rootSelector))
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
  new FullScreen().init()
}
