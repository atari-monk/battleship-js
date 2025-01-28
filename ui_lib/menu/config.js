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
}

export const FLEET_GRID_CONFIG = {
  name: 'fleet_grid',
  cssClass: 'fleet-grid',
  id: 'fleet-grid-1',
  scripts: [
    'EventHandler.js',
    'FleetGridConfig.js',
    'FleetService.js',
    'GridRenderer.js',
    'PlacementValidator.js',
    'ShipPreview.js',
    'PlacementHandler.js',
    'FleetGrid.js',
  ],
  loadFleetGridError: 'Error in loadFleetGrid:',
}

export const TOGGLE_CONFIG = {
  name: 'toggle',
  cssClass: 'toggle',
  id: 'toggle-1',
  loadToggleError: 'Error in loadToggle:',
}

export const BATTLE_GRID_CONFIG = {
  name: 'battle_grid',
  cssClass: 'battle-grid',
  id1: 'battle-grid-1',
  id2: 'battle-grid-2',
  hiddenStyle: 'battle-grid--hidden',
  loadBattleGridError: 'Error in loadBattleGrid:',
}
