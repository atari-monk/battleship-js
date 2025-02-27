export class GUIComponentStorage {
  constructor() {
    this.componentsByName = new Map()
  }

  isComponentLoaded(componentName) {
    return this.componentsByName.has(componentName)
  }

  addComponent(componentName, jsModule, allModules, html) {
    if (this.isComponentLoaded(componentName)) {
      console.warn(`Component ${componentName} is already loaded.`)
      return
    }

    const component = { componentName, jsModule, allModules, html }
    this.componentsByName.set(componentName, component)
  }

  getComponentByName(componentName) {
    return this.componentsByName.get(componentName) || null
  }

  removeComponent(componentName) {
    if (!this.isComponentLoaded(componentName)) {
      console.warn(`Component ${componentName} not found.`)
      return
    }

    this.componentsByName.delete(componentName)
  }
}
