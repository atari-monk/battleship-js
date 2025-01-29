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
  hiddenStyle: 'fleet-grid--hidden',
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

export const TOGGLE_CONFIG = {
  toogle: '.toggle',
  hiddenStyle: 'toggle--hidden',
}

export const COLOR = {
  blue: 'blue',
  green: 'green',
  red: 'red',
}

export const BATTLE_GRID_CONFIG = {
  battleGrid: 'battle_grid',
  battleGridClass: 'battle-grid',
  battleGridId1: 'battle-grid-1',
  battleGridId2: 'battle-grid-2',
  hiddenStyle: 'battle-grid--hidden',
}
