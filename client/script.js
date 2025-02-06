import {
  GUIContainerFactory,
  ServiceContainerFactory,
} from './../component_loader_lib/index.js'
import { DataServiceFactory } from './../data_lib/index.js'

export const serviceContainer = new ServiceContainerFactory().generete()
export const guiContainer = new GUIContainerFactory(serviceContainer).generete(
  './../../ui_lib'
)

async function init() {
  const dataService = await new DataServiceFactory().generete()
  serviceContainer.loadService('data_service', dataService)

  await guiContainer.loadComponentResources('full_screen')

  guiContainer.createInstance('full_screen', 'fs-overlay', 'fs-overlay-1')
}

document.addEventListener('DOMContentLoaded', init)
