export class GUIInstanceStorage {
  constructor() {
    this.instances = []
    this.idIndex = new Map()
    this.componentIndex = new Map()
  }

  addInstance(componentName, uniqueId, jsInstance, container) {
    const instance = { componentName, uniqueId, jsInstance, container }

    this.idIndex.set(uniqueId, instance)

    if (!this.componentIndex.has(componentName)) {
      this.componentIndex.set(componentName, new Set())
    }
    this.componentIndex.get(componentName).add(instance)

    this.instances.push(instance)
  }

  getInstanceById(uniqueId) {
    return this.idIndex.get(uniqueId) || null
  }

  getInstancesByComponentName(componentName) {
    return Array.from(this.componentIndex.get(componentName) || [])
  }

  removeInstanceById(uniqueId) {
    const instance = this.idIndex.get(uniqueId)
    if (instance) {
      this.instances = this.instances.filter(
        (inst) => inst.uniqueId !== uniqueId
      )
      this.idIndex.delete(uniqueId)
      this.componentIndex.get(instance.componentName)?.delete(instance)
    }
  }

  removeInstancesByComponentName(componentName) {
    const instancesToRemove =
      this.componentIndex.get(componentName) || new Set()

    this.instances = this.instances.filter(
      (instance) => !instancesToRemove.has(instance)
    )

    this.componentIndex.delete(componentName)

    instancesToRemove.forEach((instance) =>
      this.idIndex.delete(instance.uniqueId)
    )
  }
}
