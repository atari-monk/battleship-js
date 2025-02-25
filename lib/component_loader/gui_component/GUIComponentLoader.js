export class GUIComponentLoader {
  set basePath(basePath) {
    this._basePath = basePath
  }

  set componentName(componentName) {
    this._componentName = componentName
  }

  async loadHtml() {
    const response = await fetch(
      `${this._basePath}/${this._componentName}.html`
    )
    return response.text()
  }

  async loadCss() {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = `${this._basePath}/${this._componentName}.css`
    document.head.appendChild(link)
  }

  generateContainer(rootDivClassName, html) {
    const container = document.createElement('div')
    container.className = rootDivClassName
    container.innerHTML = html
    return container
  }

  async loadScripts(scripts) {
    return Promise.all(scripts.map((script) => this.loadScript(script)))
  }

  async loadScript(script) {
    try {
      const module = await import(`${this._basePath}/${script}`)
      return { name: script, module }
    } catch (error) {
      console.warn(`Failed to load script: ${script}`, error)
      return null
    }
  }

  async loadJsModule() {
    try {
      return await import(`${this._basePath}/${this._componentName}.js`)
    } catch (error) {
      console.error(
        `Error in main JavaScript for component: ${this._componentName}`,
        error
      )
      return null
    }
  }
}
