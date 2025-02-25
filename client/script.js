import {
  GUIContainerFactory,
  ServiceContainerFactory,
} from './../lib/component_loader/index.js'
import { DataServiceFactory } from './../lib/data/index.js'

export const serviceContainer = new ServiceContainerFactory().generete()
export const guiContainer = new GUIContainerFactory(serviceContainer).generete(
  './../../../lib/ui'
)

async function init() {
  const dataService = await new DataServiceFactory().generete()
  serviceContainer.loadService('data_service', dataService)

  await guiContainer.loadComponentResources('full_screen')

  guiContainer.createInstance('full_screen', 'fs-overlay', 'fs-overlay-1')
}

document.addEventListener('DOMContentLoaded', init)
