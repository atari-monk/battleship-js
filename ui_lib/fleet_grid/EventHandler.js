export class EventHandler {
  constructor(fleetGrid, config) {
    this.fleetGrid = fleetGrid
    this.config = config
  }

  attachEvents() {
    const container = document.querySelector(
      this.config.dot(this.config.cssClass.fleetGrid)
    )

    container.addEventListener(
      this.config.event.mousemove,
      this.fleetGrid.paintOnHover.bind(this.fleetGrid)
    )
    container.addEventListener(
      this.config.event.mouseenter,
      this.fleetGrid.paintOnHover.bind(this.fleetGrid)
    )
    container.addEventListener(
      this.config.event.touchmove,
      this.fleetGrid.paintOnHover.bind(this.fleetGrid),
      { passive: true }
    )
    container.addEventListener(
      this.config.event.touchstart,
      this.fleetGrid.paintOnHover.bind(this.fleetGrid),
      { passive: true }
    )
    container.addEventListener(
      this.config.event.click,
      this.fleetGrid.handleClick.bind(this.fleetGrid)
    )

    container.addEventListener(
      this.config.event.wheel,
      this.fleetGrid.handleWheel.bind(this.fleetGrid),
      { passive: true }
    )
  }
}
