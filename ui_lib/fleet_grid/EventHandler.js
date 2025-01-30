import { FLEET_GRID_CONFIG, EVENT } from './../config.js'

export class EventHandler {
  constructor(fleetGrid) {
    this.fleetGrid = fleetGrid
  }

  attachEvents() {
    const { fleetGrid, events, handlerWarn } = FLEET_GRID_CONFIG
    const element = document.querySelector(fleetGrid)
    const eventHandlers = this.getHandlers()

    for (const eventName of events) {
      const handler = eventHandlers[eventName]
      const options = this.getOptions(eventName)

      if (handler) {
        element.addEventListener(
          eventName,
          handler.bind(this.fleetGrid),
          options
        )
      } else {
        console.warn(handlerWarn)
      }
    }
  }

  getOptions(eventName) {
    return [EVENT.touchmove, EVENT.touchstart, EVENT.wheel].includes(eventName)
      ? { passive: true }
      : undefined
  }

  getHandlers() {
    const { paintOnHover, handleClick, handleWheel } = this.fleetGrid
    return {
      mousemove: paintOnHover,
      mouseenter: paintOnHover,
      touchmove: paintOnHover,
      touchstart: paintOnHover,
      click: handleClick,
      wheel: handleWheel,
    }
  }
}
