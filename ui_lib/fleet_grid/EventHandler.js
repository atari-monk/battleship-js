import { FLEET_GRID_CONFIG } from './FLEET_GRID_CONFIG'

export class EventHandler {
  constructor(fleetGrid) {
    this.fleetGrid = fleetGrid
  }

  attachEvents() {
    const {
      fleetGrid,
      mousemove,
      mouseenter,
      touchmove,
      touchstart,
      click,
      wheel,
    } = FLEET_GRID_CONFIG
    const ui = document.querySelector(fleetGrid)

    ui.addEventListener(
      mousemove,
      this.fleetGrid.paintOnHover.bind(this.fleetGrid)
    )
    ui.addEventListener(
      mouseenter,
      this.fleetGrid.paintOnHover.bind(this.fleetGrid)
    )
    ui.addEventListener(
      touchmove,
      this.fleetGrid.paintOnHover.bind(this.fleetGrid),
      { passive: true }
    )
    ui.addEventListener(
      touchstart,
      this.fleetGrid.paintOnHover.bind(this.fleetGrid),
      { passive: true }
    )
    ui.addEventListener(click, this.fleetGrid.handleClick.bind(this.fleetGrid))

    ui.addEventListener(
      wheel,
      this.fleetGrid.handleWheel.bind(this.fleetGrid),
      { passive: true }
    )
  }
}
