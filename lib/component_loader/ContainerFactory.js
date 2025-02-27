import { ComponentLoader } from './ComponentLoader.js'
import { ComponentUnloader } from './ComponentUnloader.js'
import { ComponentStorage } from './ComponentStorage.js'
import { ComponentContainer } from './ComponentContainer.js'
import { InstanceStorage } from './InstanceStorage.js'

export class ContainerFactory {
  constructor(serviceContainer) {
    this.serviceContainer = serviceContainer
  }

  generete(basePath) {
    const componentLoader = new ComponentLoader()
    const componentUnloader = new ComponentUnloader()
    const componentStorage = new ComponentStorage()
    const instanceStorage = new InstanceStorage()
    const container = new ComponentContainer(
      this.serviceContainer,
      componentLoader,
      componentUnloader,
      componentStorage,
      instanceStorage
    )
    container.basePath = basePath
    return container
  }
}
