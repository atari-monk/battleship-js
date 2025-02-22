import { EVENT, query } from '../../shared_lib_2/index.js'

export class EventAttacher {
  constructor(
    config,
    gridCells,
    fleetService,
    { fleetPaintOnHoverEventHandler, fleetPlacementClickEventHandler }
  ) {
    this._config = config
    this._gridCells = gridCells
    this._fleetService = fleetService
    this._fleetPaintOnHoverEventHandler = fleetPaintOnHoverEventHandler
    this._fleetPlacementClickEventHandler = fleetPlacementClickEventHandler
  }

  attachEvents() {
    const { selector } = this._config

    const element = query(selector)

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
    const {
      event: { startsWith },
    } = this._config
    const options = { passive: true }
    const paintHandler = this._fleetPaintOnHoverEventHandler.handle.bind(
      this._fleetPaintOnHoverEventHandler
    )
    const clickHandler = this._fleetPlacementClickEventHandler.handle.bind(
      this._fleetPlacementClickEventHandler
    )
    const commonEvents = [
      EVENT.MOUSE_MOVE,
      EVENT.MOUSE_ENTER,
      EVENT.TOUCH_MOVE,
      EVENT.TOUCH_START,
    ]

    const events = commonEvents.map((eventName) => ({
      eventName,
      handler: paintHandler,
      options: eventName.startsWith(startsWith) ? options : undefined,
    }))
    events.push(
      { eventName: EVENT.CLICK, handler: clickHandler },
      {
        eventName: EVENT.WHEEL,
        handler: paintHandler,
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
