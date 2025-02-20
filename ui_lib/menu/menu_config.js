import { EVENT } from '../../shared_lib_2/constants.js'

export const MENU_COMPONENT_CONFIG = {
  message: {
    init: 'Loading component: menu',
  },
  button: {
    id: 'gameMenuStartButton',
    eventType: EVENT.CLICK,
  },
  hide: {
    selector: '.fs-overlay',
    cssClass: 'fs-overlay--hidden',
    forceState: true,
  },
  menu: {
    componentName: 'menu',
    cssClass: 'game-menu',
    elements: [{ elementId: 'game-menu-1' }],
  },
}
