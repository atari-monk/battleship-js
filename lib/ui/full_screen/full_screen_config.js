import { EVENT } from './../../shared/index.js'

export const FULL_SCREEN = {
  message: {
    init: 'Loading component: full_screen',
  },
  button: {
    id: 'fsOverlayButton',
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
