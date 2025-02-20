import { FULL_SCREEN } from './config.js'
import { FullScreenComponent } from './FullScreen.js'
import { FullscreenEventHandler } from './FullscreenEventHandler.js'

export default function init({ serviceContainer, guiContainer } = {}) {
  const eventHandler = new FullscreenEventHandler(FULL_SCREEN, guiContainer)
  return new FullScreenComponent(FULL_SCREEN, guiContainer, eventHandler)
}
