import { format } from './../../shared_lib/LogFormatter.js'
import { TOGGLE_CONFIG } from './../config.js'

export class Toggle {
  constructor(guiContainer) {
    this.guiContainer = guiContainer
    this.isToggled = false
    this.isTouch = false
  }

  init() {
    const { toggleButtonId, fleetGridId, initMsg, componentsNotFoundWarn } =
      TOGGLE_CONFIG
    this.toggleButton = document.getElementById(toggleButtonId)
    this.fleetGrid = this.guiContainer.getInstanceById(fleetGridId).jsInstance

    if (this.toggleButton && this.fleetGrid) {
      this.setButtonClick()
      console.debug(...format.debug(initMsg))
    } else {
      console.warn(...format.warn(componentsNotFoundWarn))
    }
  }

  setButtonClick() {
    const { touchStartEvent, clickEvent } = TOGGLE_CONFIG
    this.toggleButton.addEventListener(
      touchStartEvent,
      (event) => {
        this.isTouch = true
        this.handleToggle(event)
      },
      { passive: true }
    )

    this.toggleButton.addEventListener(clickEvent, (event) => {
      if (this.isTouch) {
        this.isTouch = false
        return
      }
      this.handleToggle(event)
    })

    this.toggleButton.classList.add(TOGGLE_CONFIG.toggledOff)
  }

  handleToggle(event) {
    this.isToggled = !this.isToggled

    if (this.isToggled) {
      this.toggleButton.classList.add(TOGGLE_CONFIG.toggledOn)
      this.toggleButton.classList.remove(TOGGLE_CONFIG.toggledOff)
    } else {
      this.toggleButton.classList.add(TOGGLE_CONFIG.toggledOff)
      this.toggleButton.classList.remove(TOGGLE_CONFIG.toggledOn)
    }

    this.fleetGrid.fleetService.toggleOrientation()
    this.fleetGrid.paintOnHover(
      this.fleetGrid.placementHandler.currentHoverPosition
    )
  }
}

export default function init({ serviceContainer, guiContainer } = {}) {
  new Toggle(guiContainer).init()
}
