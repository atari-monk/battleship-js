import { logger } from '../../data_lib/LogService.js'

export class ServiceContainer {
  constructor(serviceLoader, serviceUnloader, serviceStorage) {
    this.loader = serviceLoader
    this.unloader = serviceUnloader
    this.storage = serviceStorage
    this.msg = {
      SERVICE_ALREADY_LOADED: (serviceName) =>
        `Service already loaded: ${serviceName}`,
      SERVICE_NOT_LOADED: (serviceName) => `Service not loaded: ${serviceName}`,
      SERVICE_LOADED: (serviceName) => `Load service: ${serviceName}`,
      SERVICE_UNLOADED: (serviceName) => `Service unloaded: ${serviceName}`,
    }
  }

  loadService(serviceName, serviceInstance) {
    if (this.storage.isServiceLoaded(serviceName)) {
      logger.warn(this.msg.SERVICE_ALREADY_LOADED(serviceName))
      return
    }

    this.loader.serviceName = serviceName
    this.loader.serviceInstance = serviceInstance

    const serviceData = this.loader.loadService()
    if (serviceData) {
      this.storage.addService(serviceName, serviceData.instance)
      logger.debug(this.msg.SERVICE_LOADED(serviceName))
    }
  }

  unloadService(serviceName) {
    const serviceIndex = this.storage.findServiceIndex(serviceName)
    if (serviceIndex === -1) {
      logger.warn(this.msg.SERVICE_NOT_LOADED(serviceName))
      return
    }

    const serviceData = this.storage.loadedServices[serviceIndex]
    this.unloader.unloadService(serviceData.instance)

    this.storage.removeService(serviceIndex)
    logger.debug(this.msg.SERVICE_UNLOADED(serviceName))
  }

  getServiceByName(serviceName) {
    return this.storage.getServiceByName(serviceName)
  }
}
