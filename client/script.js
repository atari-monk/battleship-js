import { ServiceContainerFactory } from './../lib/service_loader/index.js'
import { ContainerFactory } from './../lib/component_loader/index.js'
import { DATA_CONFIG, DataServiceFactory } from './../lib/data/index.js'
import { GRID_CONFIG } from './../lib/ui/index.js'

async function init() {
  const serviceContainer = new ServiceContainerFactory().generete()
  const container = new ContainerFactory(serviceContainer).generete(
    './../../../lib/ui'
  )

  const dataService = await new DataServiceFactory({
    data: DATA_CONFIG,
    grid: GRID_CONFIG,
  }).generete()
  serviceContainer.loadService('data_service', dataService)

  await container.loadComponentResources('full_screen')

  container.createInstance('full_screen', 'fs-overlay', 'fs-overlay-1')
}

document.addEventListener('DOMContentLoaded', init)
