import { guiContener } from './../../client/script.js'
import { logger } from './../../data_lib/LogService.js'

export class FullScreen {
  constructor() {
    this.config = {
      fsOverlay: '.fs-overlay',
      hidden: 'fs-overlay--hidden',
      fsOverlayButton: 'fsOverlayButton',
      click: 'click',
      initMsg: 'Load component: full_screen',
    }
    this.menuConfig = {
      componentName: 'menu',
      rootDivClass: 'game-menu',
      divId: 'game-menu-1',
    }
    this.error = {
      goFullScreen: 'Error in goFullScreen:',
      showMenu: 'Error in showMenu:',
    }
    this.warn = {
      requestFullscreen: 'Fullscreen request not supported',
      overlay: 'Overlay element not found',
      button: 'Button element not found',
    }
  }

  async goFullScreen() {
    try {
      this.requestFullscreen()
      this.hide()
      await this.showMenu()
    } catch (error) {
      logger.error(this.error.goFullScreen, error)
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
      logger.warn(this.warn.requestFullscreen)
    }
  }

  hide() {
    const { fsOverlay, hidden } = this.config
    const overlay = document.querySelector(fsOverlay)
    if (overlay) {
      overlay.classList.add(hidden)
    } else {
      logger.warn(this.warn.overlay)
    }
  }

  async showMenu() {
    const { componentName, rootDivClass, divId } = this.menuConfig

    try {
      await guiContener.loadComponentResources(componentName)
      guiContener.createInstance(componentName, rootDivClass, divId)
    } catch (error) {
      logger.error(this.error.showMenu, error)
    }
  }

  init() {
    const { initMsg } = this.config

    this.setButtonClick()

    logger.debug(initMsg)
  }

  setButtonClick() {
    const { fsOverlayButton, click } = this.config
    const button = document.getElementById(fsOverlayButton)
    if (button) {
      button.addEventListener(click, (event) => this.goFullScreen(event))
    } else {
      logger.warn(this.warn.button)
    }
  }
}

export default function init() {
  new FullScreen().init()
}
