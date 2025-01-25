export class ServiceUnloader {
  unloadService(serviceInstance) {
    if (serviceInstance && typeof serviceInstance.dispose === 'function') {
      serviceInstance.dispose()
    }
  }
}
