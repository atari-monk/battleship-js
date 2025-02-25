import { toggleObj } from './../../shared_lib/index.js'

export class ToggleEventHandler {
  constructor(config, guiContainer) {
    this._config = config
    this._guiContainer = guiContainer
    this._isToggled = false
    this._isTouch = false
    this._fleetGrid = this._setFleetGrid()
  }

  init(button) {
    const {
      button: { toggledOn, toggledOff },
      error: { noRequiredElements },
    } = this._config

    if (!this._fleetGrid || !button) {
      throw new Error(noRequiredElements)
    }

    this._toggleOff = {
      element: button,
      cssClass: toggledOff,
    }

    this._toggleOn = {
      element: button,
      cssClass: toggledOn,
    }

    toggleObj(this._toggleOff)
  }

  handleClick() {
    if (this._isTouch) {
      this._isTouch = false
      return
    }

    this._handleToggle()
  }

  handleTouch() {
    this._isTouch = true

    this._handleToggle()
  }

  _setFleetGrid() {
    const { id } = this._config.fleetGrid
    return this._guiContainer.getInstanceById(id).jsInstance
  }

  _handleToggle() {
    this._isToggled = !this._isToggled

    toggleObj(this._toggleOn)
    toggleObj(this._toggleOff)

    this._fleetGrid.toggleOrientation()

    this._fleetGrid.paintOnHover()
  }
}
