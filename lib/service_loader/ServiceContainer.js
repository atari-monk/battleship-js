import { format, LEVEL } from './../shared/index.js'

const SERVICE_MESSAGES = {
  ALREADY_LOADED: (serviceName) => `Service already loaded: ${serviceName}`,
  NOT_LOADED: (serviceName) => `Service not loaded: ${serviceName}`,
  LOADED: (serviceName) => `Load service: ${serviceName}`,
  DISPOSED: (serviceName) => `Disposing service: ${serviceName}`,
  UNLOADED: (serviceName) => `Service unloaded: ${serviceName}`,
}

export class ServiceContainer {
  #storage

  constructor(serviceStorage) {
    this.#storage = serviceStorage
  }

  loadService(serviceName, serviceInstance) {
    if (this.#storage.isServiceLoaded(serviceName)) {
      console.warn(
        format(LEVEL.WARN, SERVICE_MESSAGES.ALREADY_LOADED(serviceName))
      )
      return
    }

    this.#storage.addService(serviceName, serviceInstance)

    console.debug(format(SERVICE_MESSAGES.LOADED(serviceName)))
  }

  unloadService(serviceName) {
    const serviceData = this.#storage.getServiceByName(serviceName)
    if (!serviceData) {
      console.warn(format(LEVEL.WARN, SERVICE_MESSAGES.NOT_LOADED(serviceName)))
      return
    }

    const { instance } = serviceData
    if (instance?.dispose) {
      console.debug(format(LEVEL.DEBUG, SERVICE_MESSAGES.DISPOSED(serviceName)))
      instance.dispose()
    }

    this.#storage.removeService(serviceName)
    console.debug(format(SERVICE_MESSAGES.UNLOADED(serviceName)))
  }

  getService(serviceName) {
    return this.#storage.getServiceByName(serviceName)
  }
}
