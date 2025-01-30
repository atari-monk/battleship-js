export const EVENT = {
  mousemove: 'mousemove',
  mouseenter: 'mouseenter',
  touchmove: 'touchmove',
  touchstart: 'touchstart',
  click: 'click',
  wheel: 'wheel',
}

export const FULL_SCREEN_CONFIG = {
  fsOverlay: '.fs-overlay',
  hiddenStyle: 'fs-overlay--hidden',
  fsOverlayButton: 'fsOverlayButton',
  clickEvent: 'click',
  initMsg: 'Load component: full_screen',
  goFullScreenError: 'Error in goFullScreen:',
  requestFullscreenWarn: 'Fullscreen request not supported',
  overlayWarn: 'Overlay element not found',
  buttonWarn: 'Button element not found',
}

export const MENU_CONFIG = {
  name: 'menu',
  cssClass: 'game-menu',
  id: 'game-menu-1',
  startButtonId: 'gameMenuStartButton',
  clickEvent: 'click',
  initMsg: 'Load component: menu',
  menuDivClass: '.game-menu',
  hiddenStyle: 'game-menu--hidden',
  dataServiceName: 'data_service',
  buttonNotFoundWarn: 'Menu start button not found',
  menuNotFoundWarn: 'Menu div not found',
  handleClickError: 'Error in handleClick:',
  showMenuError: 'Error in showMenu:',
}

export const FLEET_GRID_CONFIG = {
  name: 'fleet_grid',
  fleetGrid: '.fleet-grid',
  fleetGridGrid: '.fleet-grid__grid',
  fleetGridCell: 'fleet-grid__item',
  hiddenStyle: 'fleet-grid--hidden',
  cssClass: 'fleet-grid',
  id: 'fleet-grid-1',
  scripts: [
    './../config.js',
    'EventHandler.js',
    'FleetService.js',
    'GridRenderer.js',
    'PlacementValidator.js',
    'ShipPreview.js',
    'PlacementHandler.js',
    'FleetGrid.js',
  ],
  events: [
    EVENT.mousemove,
    EVENT.mouseenter,
    EVENT.touchmove,
    EVENT.touchstart,
    EVENT.click,
    EVENT.wheel,
  ],
  handlerWarn: 'Handler for event not found',
  gridError: (selector) => `Container with selector ${selector} not found.`,
  itemsError: 'Grid items have not been generated yet.',
  player1Data: (playerName, fleet) =>
    `7. Load data:\n\tPlayer 1 - '${playerName}'\n\tFleet:\n\t\t${fleet}`,
  initMsg: 'Load component: fleet_grid',
  loadFleetGridError: 'Error in loadFleetGrid:',
}

export const TOGGLE_CONFIG = {
  name: 'toggle',
  toogle: '.toggle',
  cssClass: 'toggle',
  id: 'toggle-1',
  toggleButtonId: 'toggle-button',
  fleetGridId: 'fleet-grid-1',
  initMsg: 'Load component: toggle',
  componentsNotFoundWarn: 'Toggle button or grid instance not found',
  toggledOn: 'toggle__button--toggled-on',
  toggledOff: 'toggle__button--toggled-off',
  touchStartEvent: 'touchstart',
  clickEvent: 'click',
  loadToggleError: 'Error in loadToggle:',
  hiddenStyle: 'toggle--hidden',
}

export const BATTLE_GRID_CONFIG = {
  name: 'battle_grid',
  cssClass: 'battle-grid',
  id1: 'battle-grid-1',
  id2: 'battle-grid-2',
  hiddenStyle: 'battle-grid--hidden',
  battleGrid: 'battle_grid',
  battleGridClass: 'battle-grid',
  battleGridId1: 'battle-grid-1',
  battleGridId2: 'battle-grid-2',
  hiddenStyle: 'battle-grid--hidden',
  loadBattleGridError: 'Error in loadBattleGrid:',

  battleGrid: 'battle-grid',
  battleGridGrid: 'battle-grid__grid',
  battleGridCell: 'battle-grid__item',
  battleGrid1: 'battle-grid-1',
  battleGrid2: 'battle-grid-2',
  hiddenStyle: 'battle-grid--hidden',
  initMsg: (id) => `Load component: ${id}`,
  getSelector: (id, cssClass) => `#${id} .${cssClass}`,
  notFoundError: (id) => `Container with selector ${id} not found.`,
  itemsError: 'Grid items have not been generated yet.',
  cellError: 'No cell found!',
}

export const HTML_CONFIG = {
  div: 'div',
}

export const COLOR = {
  blue: 'blue',
  green: 'green',
  red: 'red',
  lightRed: 'rgba(255, 0, 0, 0.7)',
  grey: 'rgba(128, 128, 128, 0.7)',
}
