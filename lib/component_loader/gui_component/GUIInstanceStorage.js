export class GUIInstanceStorage {
  constructor() {
    this.instances = []
  }

  addInstance(componentName, uniqueId, jsInstance, container) {
    this.instances.push({
      componentName,
      uniqueId,
      jsInstance,
      container,
    })
  }

  getInstanceById(uniqueId) {
    return (
      this.instances.find((instance) => instance.uniqueId === uniqueId) || null
    )
  }

  getInstancesByComponentName(componentName) {
    return this.instances.filter(
      (instance) => instance.componentName === componentName
    )
  }

  removeInstanceById(uniqueId) {
    const index = this.instances.findIndex(
      (instance) => instance.uniqueId === uniqueId
    )
    if (index !== -1) {
      this.instances.splice(index, 1)
    }
  }

  removeInstancesByComponentName(componentName) {
    this.instances = this.instances.filter(
      (instance) => instance.componentName !== componentName
    )
  }
}
