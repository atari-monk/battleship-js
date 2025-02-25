import { ServiceLoader } from './service_component/ServiceLoader.js'
import { ServiceUnloader } from './service_component/ServiceUnloader.js'
import { ServiceStorage } from './service_component/ServiceStorage.js'
import { ServiceContainer } from './service_component/ServiceContainer.js'

export class ServiceContainerFactory {
  generete() {
    const serviceLoader = new ServiceLoader()
    const serviceUnloader = new ServiceUnloader()
    const serviceStorage = new ServiceStorage()
    return new ServiceContainer(serviceLoader, serviceUnloader, serviceStorage)
  }
}
