import { ServiceStorage } from './ServiceStorage.js'
import { ServiceContainer } from './ServiceContainer.js'

export class ServiceContainerFactory {
  generete() {
    const serviceStorage = new ServiceStorage()
    return new ServiceContainer(serviceStorage)
  }
}
