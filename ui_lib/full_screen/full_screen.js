import { FullScreen } from './FullScreen.js'
import { FULL_SCREEN } from './config.js'

export default function init({ serviceContainer, guiContainer } = {}) {
  return new FullScreen(FULL_SCREEN, guiContainer)
}
