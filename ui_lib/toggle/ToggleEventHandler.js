import { toggle, selectById } from './../../shared_lib/ui.js'
import { TOGGLE_CONFIG, TOGGLE_SELECT } from './../config.js'

export class ToggleEventHandler {
  constructor(guiContainer) {
    this._guiContainer = guiContainer
    this.isToggled = false
    this.isTouch = false
    this.fleetGrid = this._guiContainer.getInstanceById(
      TOGGLE_CONFIG.fleetGridId
    ).jsInstance
  }

  setToggleButton() {
    this.toggleButton = selectById(TOGGLE_SELECT)

    this.toggleOff = {
      element: this.toggleButton,
      cssClass: TOGGLE_CONFIG.toggledOff,
    }

    this.toggleOn = {
      element: this.toggleButton,
      cssClass: TOGGLE_CONFIG.toggledOn,
    }

    if (!this.fleetGrid || !this.toggleButton) {
      console.warn(...format.warn(TOGGLE_CONFIG.componentsNotFoundWarn))
    }

    toggle(this.toggleOff)
  }

  handleToggle() {
    this.isToggled = !this.isToggled

    toggle(this.toggleOn)
    toggle(this.toggleOff)

    this.fleetGrid.fleetService.toggleOrientation()
    this.fleetGrid.paintOnHover(
      this.fleetGrid.placementHandler.currentHoverPosition
    )
  }

  handleClick(event) {
    if (this.isTouch) {
      this.isTouch = false
      return
    }
    this.handleToggle()
  }

  handleTouch() {
    this.isTouch = true
    this.handleToggle()
  }
}
