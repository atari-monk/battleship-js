export class ServiceLoader {
  set serviceInstance(serviceInstance) {
    this._serviceInstance = serviceInstance
  }

  set serviceName(serviceName) {
    this._serviceName = serviceName
  }

  loadService() {
    try {
      if (!this._serviceInstance) {
        throw new Error('Service instance is not set.')
      }
      return { name: this._serviceName, instance: this._serviceInstance }
    } catch (error) {
      console.error(`Failed to load service: ${this._serviceName}`, error)
      return null
    }
  }
}
