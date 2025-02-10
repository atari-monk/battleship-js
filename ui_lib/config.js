export const EVENT = {
  mousemove: 'mousemove',
  mouseenter: 'mouseenter',
  touchmove: 'touchmove',
  touchstart: 'touchstart',
  click: 'click',
  wheel: 'wheel',
}

export const FULL_SCREEN = {
  initMsg: 'Loading component: full_screen',
  buttonId: 'fsOverlayButton',
  selector: 'fs-overlay',
  get classSelector() {
    return `.${this.selector}`
  },
  hidden: 'fs-overlay--hidden',
  fullScreenError: 'Error switching to full screen mode:',
}

export const FULL_SCREEN_BUTTON = {
  id: FULL_SCREEN.buttonId,
  eventType: EVENT.click,
}

export const FULL_SCREEN_HIDE = {
  selector: FULL_SCREEN.classSelector,
  cssClass: FULL_SCREEN.hidden,
}

export const MENU_COMPONENT = {
  componentName: 'menu',
  cssClass: 'game-menu',
  elementId: 'game-menu-1',
}

export const MENU_CONFIG = {
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

export const MENU_BUTTON = {
  id: MENU_CONFIG.startButtonId,
  eventType: EVENT.click,
}

export const MENU_HIDE = {
  selector: MENU_CONFIG.menuDivClass,
  cssClass: MENU_CONFIG.hiddenStyle,
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

export const TOGGLE_SELECT = {
  id: TOGGLE_CONFIG.toggleButtonId,
}

export const TOGGLE_CLICK = {
  id: TOGGLE_CONFIG.toggleButtonId,
  eventType: EVENT.click,
}

export const TOGGLE_TOUCH = {
  id: TOGGLE_CONFIG.toggleButtonId,
  eventType: EVENT.touchstart,
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
