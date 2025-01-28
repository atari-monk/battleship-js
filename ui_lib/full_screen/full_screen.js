import { guiContener } from './../../client/script.js'
import { logger } from './../../data_lib/LogService.js'
import { FULL_SCREEN_CONFIG, MENU_CONFIG } from './config.js'

export class FullScreen {
  async goFullScreen() {
    const { goFullScreenError } = FULL_SCREEN_CONFIG
    try {
      this.requestFullscreen()
      this.hide()
      await this.showMenu()
    } catch (error) {
      logger.error(goFullScreenError, error)
    }
  }

  requestFullscreen() {
    const { requestFullscreenWarn } = FULL_SCREEN_CONFIG
    const el = document.documentElement
    const request =
      el.requestFullscreen ||
      el.mozRequestFullScreen ||
      el.webkitRequestFullscreen ||
      el.msRequestFullscreen

    if (request) {
      request.call(el)
    } else {
      logger.warn(requestFullscreenWarn)
    }
  }

  hide() {
    const { fsOverlay, hiddenStyle } = FULL_SCREEN_CONFIG
    const overlay = document.querySelector(fsOverlay)
    if (overlay) {
      overlay.classList.add(hiddenStyle)
    } else {
      logger.warn(this.warn.overlay)
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

  init() {
    const { initMsg } = FULL_SCREEN_CONFIG
    this.setButtonClick()
    logger.debug(initMsg)
  }

  setButtonClick() {
    const {
      fsOverlayButton,
      clickEvent: click,
      buttonWarn,
    } = FULL_SCREEN_CONFIG
    const button = document.getElementById(fsOverlayButton)
    if (button) {
      button.addEventListener(click, (event) => this.goFullScreen(event))
    } else {
      logger.warn(buttonWarn)
    }
  }
}

export default function init() {
  new FullScreen().init()
}
