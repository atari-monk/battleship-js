import { EVENT } from '../../shared_lib/index.js'

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
  error: {
    gameLoadingFailed: 'Error in loading game',
  },
}
