import { format } from './../../shared_lib/LogFormatter.js'
import { setEvent, toggle } from './../../shared_lib/ui.js'
import { TOGGLE_CONFIG, TOGGLE_CLICK, TOGGLE_TOUCH } from './../config.js'

export class ToggleComponent {
  constructor(eventHandler) {
    this._eventHandler = eventHandler
    this._init()
  }

  _init() {
    console.debug(...format.debug(TOGGLE_CONFIG.initMsg))

    this._eventHandler.setToggleButton()

    setEvent({
      ...TOGGLE_CLICK,
      handler: (event) => {
        if (this.isTouch) {
          this.isTouch = false
          return
        }
        this._eventHandler.handleToggle(event)
      },
    })

    setEvent({
      ...TOGGLE_TOUCH,
      handler: () => {
        this.isTouch = true
        this._eventHandler.handleToggle()
      },
      isPassive: true,
    })
  }
}
