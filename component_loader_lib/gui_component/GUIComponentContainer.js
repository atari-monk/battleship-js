export class GUIComponentContainer {
  set basePath(path) {
    this._basePath = path
  }

  constructor(
    componentLoader,
    componentUnloader,
    componentStorage,
    instanceStorage
  ) {
    this.loader = componentLoader
    this.unloader = componentUnloader
    this.componentStorage = componentStorage
    this.instanceStorage = instanceStorage
  }

  async loadComponentResources(componentName, scripts = []) {
    if (this.componentStorage.isComponentLoaded(componentName)) {
      console.warn(`Component resources already loaded: ${componentName}`)
      return
    }

    if (!this._basePath) throw new Error('_basePath needs to be set!')
    this.loader.basePath = `${this._basePath}/${componentName}`
    this.loader.componentName = componentName

    try {
      const html = await this.loader.loadHtml()
      await this.loader.loadCss()
      const allModules =
        scripts.length > 0 ? await this.loader.loadScripts(scripts) : []
      const jsModule = await this.loader.loadJsModule()

      this.componentStorage.addComponent(
        componentName,
        jsModule,
        allModules,
        html
      )
    } catch (error) {
      console.error(
        `Error loading component resources: ${componentName}`,
        error
      )
    }
  }

  createInstance(componentName, rootDivClassName, uniqueDivId) {
    const component = this.componentStorage.getComponentByName(componentName)
    if (!component) {
      console.error(`Component not loaded: ${componentName}`)
      return null
    }

    const container = document.createElement('div')
    container.className = rootDivClassName
    container.id = uniqueDivId
    container.innerHTML = component.html
    document.body.appendChild(container)

    let jsInstance = null
    if (
      component.jsModule &&
      typeof component.jsModule.default === 'function'
    ) {
      jsInstance = component.jsModule.default(this)
    }

    this.instanceStorage.addInstance(
      componentName,
      uniqueDivId,
      jsInstance,
      container
    )

    return { container, jsInstance }
  }

  getInstanceById(uniqueId) {
    return this.instanceStorage.getInstanceById(uniqueId)
  }

  getInstancesByComponentName(componentName) {
    return this.instanceStorage.getInstancesByComponentName(componentName)
  }

  removeInstanceById(uniqueId) {
    const instance = this.instanceStorage.getInstanceById(uniqueId)
    if (!instance) {
      console.warn(`Instance not found: ${uniqueId}`)
      return
    }

    if (instance.container) {
      instance.container.remove()
    }
    this.instanceStorage.removeInstanceById(uniqueId)
    console.log(`Instance removed: ${uniqueId}`)
  }

  removeInstancesByComponentName(componentName) {
    const instances =
      this.instanceStorage.getInstancesByComponentName(componentName)
    instances.forEach((instance) => {
      if (instance.container) {
        instance.container.remove()
      }
    })
    this.instanceStorage.removeInstancesByComponentName(componentName)
    console.log(`All instances of component removed: ${componentName}`)
  }
}
