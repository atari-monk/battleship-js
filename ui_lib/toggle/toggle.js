import { ToggleComponent } from './ToggleComponent.js'
import { ToggleEventHandler } from './ToggleEventHandler.js'

export default function init({ serviceContainer, guiContainer } = {}) {
  const eventHandler = new ToggleEventHandler(guiContainer)
  return new ToggleComponent(eventHandler)
}
