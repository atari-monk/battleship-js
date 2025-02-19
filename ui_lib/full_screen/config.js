import { EVENT } from './../../shared_lib_2/constants.js'

export const FULL_SCREEN = {
  message: {
    init: 'Loading component: full_screen',
  },
  button: {
    id: 'fsOverlayButton',
    eventType: EVENT.click,
  },
  hide: {
    elementSelector: '.fs-overlay',
    cssClass: 'fs-overlay--hidden',
    forceState: true,
  },
  menu: {
    componentName: 'menu',
    cssClass: 'game-menu',
    elements: [{ elementId: 'game-menu-1' }],
  },
}
