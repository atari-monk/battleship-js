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
  }

  async goFullScreen() {
    this.requestFullscreen()
    this.hide()
    await this.showMenu()
  }

  requestFullscreen() {
    const el = document.documentElement
    const request =
      el.requestFullscreen ||
      el.mozRequestFullScreen ||
      el.webkitRequestFullscreen ||
      el.msRequestFullscreen
    request?.call(el)
  }

  hide() {
    const { fsOverlay, hidden } = this.config
    document.querySelector(fsOverlay).classList.add(hidden)
  }

  async showMenu() {
    const { componentName, rootDivClass, divId } = this.menuConfig
    await guiContener.loadComponentResources(componentName)
    guiContener.createInstance(componentName, rootDivClass, divId)
  }

  init() {
    const { fsOverlayButton, click, initMsg } = this.config
    this.setButtonClick(fsOverlayButton, click)
    logger.debug(initMsg)
  }

  setButtonClick(fsOverlayButton, click) {
    document
      .getElementById(fsOverlayButton)
      .addEventListener(click, (event) => this.goFullScreen(event))
  }
}

export default function init() {
  const fs = new FullScreen()
  fs.init()
}
