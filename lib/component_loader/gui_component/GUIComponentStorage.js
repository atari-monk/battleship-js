export class GUIComponentStorage {
  constructor() {
    this.loadedComponents = []
  }

  isComponentLoaded(componentName) {
    return this.loadedComponents.some((comp) => comp.name === componentName)
  }

  findComponentIndex(componentName) {
    return this.loadedComponents.findIndex(
      (comp) => comp.name === componentName
    )
  }

  addComponent(componentName, jsModule, allModules, html) {
    this.loadedComponents.push({
      name: componentName,
      jsModule,
      allModules,
      html,
    })
  }

  getComponentByName(componentName) {
    return this.loadedComponents.find((comp) => comp.name === componentName)
  }

  removeComponent(componentIndex) {
    this.loadedComponents.splice(componentIndex, 1)
  }
}
