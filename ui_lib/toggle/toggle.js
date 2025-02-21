import { TOGGLE_COMPONENT_CONFIG } from './toggle_config.js'
import { ToggleComponent } from './ToggleComponent.js'
import { ToggleEventHandler } from './ToggleEventHandler.js'

export default function init({ serviceContainer, guiContainer } = {}) {
  const eventHandler = new ToggleEventHandler(
    TOGGLE_COMPONENT_CONFIG,
    guiContainer
  )
  return new ToggleComponent(TOGGLE_COMPONENT_CONFIG, eventHandler)
}
