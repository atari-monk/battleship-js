import { ServiceLoader } from './ServiceLoader.js'
import { ServiceUnloader } from './ServiceUnloader.js'
import { ServiceStorage } from './ServiceStorage.js'
import { ServiceContainer } from './ServiceContainer.js'

export class ServiceContainerFactory {
  generete() {
    const serviceLoader = new ServiceLoader()
    const serviceUnloader = new ServiceUnloader()
    const serviceStorage = new ServiceStorage()
    return new ServiceContainer(serviceLoader, serviceUnloader, serviceStorage)
  }
}
