export const EVENT = {
  mousemove: 'mousemove',
  mouseenter: 'mouseenter',
  touchmove: 'touchmove',
  touchstart: 'touchstart',
  click: 'click',
  wheel: 'wheel',
}

export const FLEET_GRID_CONFIG = {
  fleetGrid: '.fleet-grid',
  events: [
    EVENT.mousemove,
    EVENT.mouseenter,
    EVENT.touchmove,
    EVENT.touchstart,
    EVENT.click,
    EVENT.wheel,
  ],
  handlerWarn: 'Handler for event not found',
}
