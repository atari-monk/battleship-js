export class ServiceStorage {
  constructor() {
    this.services = new Map()
  }

  isServiceLoaded(serviceName) {
    return this.services.has(serviceName)
  }

  addService(serviceName, serviceInstance) {
    if (!this.services.has(serviceName)) {
      this.services.set(serviceName, serviceInstance)
    }
  }

  removeService(serviceName) {
    return this.services.delete(serviceName)
  }

  getServiceByName(serviceName) {
    return this.services.get(serviceName) || null
  }
}
