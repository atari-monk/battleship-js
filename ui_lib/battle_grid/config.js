export const BATTLE_GRID = {
  name: 'battle_grid',
  cssClass: 'battle-grid',
  battleGridGrid: 'battle-grid__grid',
  battleGridCell: 'battle-grid__item',
  getSelector: (id, cssClass) => `#${id} .${cssClass}`,
  elements: [
    { elementId: 'battle-grid-1', type: 'ai' },
    { elementId: 'battle-grid-2', type: 'player' },
  ],
  hiddenStyle: 'battle-grid--hidden',
  initMsg: (id) => `Load component: ${id}`,
  winMsg: (name) => `Player ${name} WON!`,
  waitOnReset: 3000,
  waitMsg: (s) => `Waiting ${s / 1000}s`,
  waitOnTurn: 2000,
  color: { red: 'red', grey: 'rgba(128, 128, 128, 0.7)' },
  event: { click: 'click' },
  actions: {
    win: 'win',
    endTurn: 'endTurn',
  },
  loadBattleGridError: 'Error in loadBattleGrid:',
  itemsError: 'Grid items have not been generated yet.',
  cellError: 'No cell found!',

  gridCells: {
    selector: (id, cssClass) => `#${id} .${cssClass}`,
    cssClass: {
      gridCssClass: 'battle-grid__grid',
      cellCssClass: 'battle-grid__item',
    },
    attribute: { style: 'style' },
    error: {
      emptyGridMetrics: 'GridMetrics is not properly initialized',
    },
  },
}
