import { guiContener, serviceContener } from './../../client/script.js'
import { MenuConfig } from './MenuConfig.js'
import { logger } from './../../data_lib/LogService.js'

const config = new MenuConfig()

export default function init() {
  document
    .getElementById(config.component.menu.id.menuStartButton)
    .addEventListener(config.component.menu.event.click, async () => {
      await handleClick()
    })
  logger.debug(config.component.menu.msg.initMsg)
}

async function handleClick() {
  hideMenu()

  const dataService = serviceContener.getServiceByName(
    config.service.dataService.name
  )

  if (dataService.config.enableFleetGrid) {
    await loadFleetGrid(dataService)
    await loadToggle()
  } else {
    dataService.initializeTurn()
    await loadBattleGrid(dataService)
  }
}

function hideMenu() {
  const {
    cssClass: { component: menuClass },
    style: { hidden: menuStyle },
  } = config.component.menu
  document.querySelector(config.dot(menuClass)).classList.add(menuStyle)
}

async function loadFleetGrid(dataService) {
  const {
    name: fleetGridName,
    cssClass: { component: fleetGridClass },
    ids: { id1: fleetGridId1 },
    scripts,
  } = config.component.fleetGrid
  await guiContener.loadComponentResources(fleetGridName, scripts)

  const fleetGrid = guiContener.createInstance(
    fleetGridName,
    fleetGridClass,
    fleetGridId1
  )

  if (dataService && fleetGrid) {
    fleetGrid.jsInstance.dataService = dataService
  }
}

async function loadToggle() {
  const {
    name: toggleName,
    cssClass: { component: toggleClass },
    ids: { id1: toggleId1 },
  } = config.component.toggle
  await guiContener.loadComponentResources(toggleName)
  guiContener.createInstance(toggleName, toggleClass, toggleId1)
}

async function loadBattleGrid(dataService) {
  await guiContener.loadComponentResources('battle_grid')
  const battleGrid1 = guiContener.createInstance(
    'battle_grid',
    'battle-grid',
    'battle-grid-1'
  ).jsInstance
  const battleGrid2 = guiContener.createInstance(
    'battle_grid',
    'battle-grid',
    'battle-grid-2'
  ).jsInstance
  battleGrid1.init('battle-grid-1', true)
  battleGrid2.init('battle-grid-2')
  if (dataService && battleGrid1 && battleGrid2) {
    battleGrid1.gridRenderer.dataService = dataService
    battleGrid2.gridRenderer.dataService = dataService
  }

  if (dataService.turn.currentPlayer === dataService.player1.name)
    document
      .getElementById('battle-grid-1')
      .classList.add('battle-grid--hidden')
  if (dataService.turn.currentPlayer === dataService.player2.name)
    document
      .getElementById('battle-grid-2')
      .classList.add('battle-grid--hidden')

  dataService.turn.printTurnInfo()
}
