import { format } from '../../shared_lib/LogFormatter'
import { setEvent, toggle, selectById } from '../../shared_lib/ui'
import {
  TOGGLE_CONFIG,
  TOGGLE_CLICK,
  TOGGLE_TOUCH,
  TOGGLE_SELECT,
} from '../config'

export class ToggleComponent {
  constructor(guiContainer) {
    this.guiContainer = guiContainer
    this.isToggled = false
    this.isTouch = false
    this._init()
  }

  _init() {
    console.debug(...format.debug(TOGGLE_CONFIG.initMsg))

    this.setToggleButton()

    this.fleetGrid = this.guiContainer.getInstanceById(
      TOGGLE_CONFIG.fleetGridId
    ).jsInstance

    if (!this.fleetGrid || !this.toggleButton) {
      console.warn(...format.warn(TOGGLE_CONFIG.componentsNotFoundWarn))
      return
    }

    setEvent({
      ...TOGGLE_CLICK,
      handler: (event) => {
        if (this.isTouch) {
          this.isTouch = false
          return
        }
        this.handleToggle(event)
      },
    })

    setEvent({
      ...TOGGLE_TOUCH,
      handler: () => {
        this.isTouch = true
        this.handleToggle()
      },
      isPassive: true,
    })

    toggle(this.toggleOff)
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
}
