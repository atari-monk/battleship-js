export const TOGGLE_COMPONENT_CONFIG = {
  component: {
    name: 'toggle',
    cssClass: 'toggle',
    elements: [{ elementId: 'toggle-1' }],
  },
  button: {
    id: 'toggle-button',
    toggledOn: 'toggle__button--toggled-on',
    toggledOff: 'toggle__button--toggled-off',
  },
  message: {
    init: 'Load component: toggle',
  },
  error: {
    noRequiredElements: 'Requried fleetGrid and toggle button not found',
  },
  fleetGrid: { id: 'fleet-grid-1' },
}
