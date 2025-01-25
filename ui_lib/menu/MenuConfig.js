export class MenuConfig {
  constructor() {
    this.service = {
      dataService: { name: 'data_service' },
    }
    this.component = {
      menu: {
        name: 'menu',
        cssClass: { component: 'game-menu' },
        id: { menuStartButton: 'gameMenuStartButton' },
        style: { hidden: 'game-menu--hidden' },
        msg: {
          initMsg: 'Load component: menu',
        },
        event: { click: 'click' },
      },
      fleetGrid: {
        name: 'fleet_grid',
        cssClass: { component: 'fleet-grid' },
        ids: { id1: 'fleet-grid-1' },
        scripts: [
          'EventHandler.js',
          'FleetGridConfig.js',
          'FleetGridConfig.js',
          'FleetService.js',
          'GridRenderer.js',
          'PlacementValidator.js',
          'ShipPreview.js',
          'PlacementHandler.js',
          'FleetGrid.js',
        ],
      },
      toggle: {
        name: 'toggle',
        cssClass: { component: 'toggle' },
        ids: { id1: 'toggle-1' },
      },
    }
  }

  dot(text) {
    return `.${text}`
  }
}
