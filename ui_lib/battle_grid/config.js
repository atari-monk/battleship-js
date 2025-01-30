export const BATTLE_GRID_CONFIG = {
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

export const EVENT_CONFIG = { click: 'click' }

export const COLOR = {
  red: 'rgba(255, 0, 0, 0.7)',
  grey: 'rgba(128, 128, 128, 0.7)',
}
