import { EVENT } from '../../shared_lib_2/constants.js'

export const MENU_COMPONENT_CONFIG = {
  dependency: {
    dataService: 'data_service',
  },
  message: {
    init: 'Loading component: menu',
  },
  button: {
    id: 'gameMenuStartButton',
    eventType: EVENT.CLICK,
  },
  hide: {
    selector: '.game-menu',
    cssClass: 'game-menu--hidden',
    forceState: true,
  },
  menu: {
    componentName: 'menu',
    cssClass: 'game-menu',
    elements: [{ elementId: 'game-menu-1' }],
  },
  error: {
    gameLoadingFailed: 'Error in loading game',
  },
}
