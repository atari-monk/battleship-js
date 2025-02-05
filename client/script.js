import {
  GUIContainerFactory,
  ServiceContainerFactory,
} from './../component_loader_lib/index.js'
import { DataServiceFactory } from './../data_lib/index.js'

export const guiContener = new GUIContainerFactory().generete('./../../ui_lib')
export const serviceContener = new ServiceContainerFactory().generete()

async function init() {
  const dataService = await new DataServiceFactory().generete()
  serviceContener.loadService('data_service', dataService)

  await guiContener.loadComponentResources('full_screen')
  
  guiContener.createInstance('full_screen', 'fs-overlay', 'fs-overlay-1')
}

document.addEventListener('DOMContentLoaded', init)
