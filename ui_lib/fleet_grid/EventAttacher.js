import { EVENT, query } from '../../shared_lib_2/index.js'

export class EventAttacher {
  constructor(config, gridCells, placementHandler, fleetService) {
    this._config = config
    this._gridCells = gridCells
    this._placementHandler = placementHandler
    this._fleetService = fleetService
  }

  attachEvents() {
    const element = query('.fleet-grid')

    this._getEvents().forEach(({ eventName, handler, logic, options }) => {
      element.addEventListener(
        eventName,
        (event) => {
          if (logic) logic(event)
          handler(event, this._gridCells.cells)
        },
        options
      )
    })
  }

  _getEvents() {
    const options = { passive: true }

    const paintOnHover = this._placementHandler.paintOnHover.bind(
      this._placementHandler
    )
    const handleClick = this._placementHandler.handleClick.bind(
      this._placementHandler
    )

    const commonEvents = [
      EVENT.MOUSE_MOVE,
      EVENT.MOUSE_ENTER,
      EVENT.TOUCH_MOVE,
      EVENT.TOUCH_START,
    ]
    const events = commonEvents.map((eventName) => ({
      eventName,
      handler: paintOnHover,
      options: eventName.startsWith('touch') ? options : undefined,
    }))
    events.push(
      { eventName: EVENT.CLICK, handler: handleClick },
      {
        eventName: EVENT.WHEEL,
        handler: paintOnHover,
        logic: (event) => this._setIsHorizontal(event),
        options,
      }
    )
    return events
  }

  _setIsHorizontal(event) {
    this._fleetService.isHorizontal = !(event.deltaY > 0 || event.deltaX > 0)
  }
}
