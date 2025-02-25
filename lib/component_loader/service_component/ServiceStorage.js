export class ServiceStorage {
  constructor() {
    this.loadedServices = []
  }

  isServiceLoaded(serviceName) {
    return this.loadedServices.some((service) => service.name === serviceName)
  }

  findServiceIndex(serviceName) {
    return this.loadedServices.findIndex(
      (service) => service.name === serviceName
    )
  }

  addService(serviceName, serviceInstance) {
    this.loadedServices.push({ name: serviceName, instance: serviceInstance })
  }

  removeService(serviceIndex) {
    this.loadedServices.splice(serviceIndex, 1)
  }

  getServiceByName(serviceName) {
    const service = this.loadedServices.find(
      (service) => service.name === serviceName
    )
    return service ? service.instance : null
  }
}
