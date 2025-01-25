import { guiContener } from './../../client/script.js'
import { logger } from './../../data_lib/LogService.js'

const className = {
  fsOverlay: '.fs-overlay',
}

const ids = {
  fsOverlayButton: 'fsOverlayButton',
}

const styles = {
  hidden: 'fs-overlay--hidden',
}

const events = {
  click: 'click',
}

const messages = {
  initMsg: 'Load component: full_screen',
}

const componentFile = {
  menu: 'menu',
}

const goFullScreen = async () => {
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen()
  } else if (document.documentElement.mozRequestFullScreen) {
    document.documentElement.mozRequestFullScreen()
  } else if (document.documentElement.webkitRequestFullscreen) {
    document.documentElement.webkitRequestFullscreen()
  } else if (document.documentElement.msRequestFullscreen) {
    document.documentElement.msRequestFullscreen()
  }
  document.querySelector(className.fsOverlay).classList.add(styles.hidden)

  await showMenu()
}

async function showMenu() {
  await guiContener.loadComponentResources(componentFile.menu)
  guiContener.createInstance(componentFile.menu, 'game-menu', 'game-menu-1')
}

export default function init() {
  const button = document.getElementById(ids.fsOverlayButton)
  button.addEventListener(events.click, goFullScreen)
  logger.debug(messages.initMsg)
}
