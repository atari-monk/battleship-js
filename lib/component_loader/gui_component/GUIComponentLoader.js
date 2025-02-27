export class GUIComponentLoader {
  setConfig(basePath, componentName) {
    if (!basePath || !componentName) {
      throw new Error('basePath and componentName are required')
    }
    this._basePath = basePath
    this._componentName = componentName
  }

  async loadHtml() {
    const response = await fetch(this._getFilePath('html'))
    return response.text()
  }

  async loadCss() {
    const href = this._getFilePath('css')
    if (document.head.querySelector(`link[href="${href}"]`)) return
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = href
    document.head.appendChild(link)
  }

  generateContainer(rootDivClassName, html) {
    const container = document.createElement('div')
    container.className = rootDivClassName
    container.appendChild(document.createRange().createContextualFragment(html))
    return container
  }

  async loadScripts(scripts) {
    const results = await Promise.all(
      scripts.map(async (script) => {
        try {
          const module = await import(this._getScriptPath(script))
          return { name: script, module }
        } catch (error) {
          console.warn(`Failed to load script: ${script}`, error)
          return null
        }
      })
    )

    return results.filter(Boolean)
  }

  async loadJsModule() {
    try {
      return await import(this._getFilePath('js'))
    } catch (error) {
      console.error(
        `Error in main JavaScript for component: ${this._componentName}`,
        error
      )
      return null
    }
  }

  _getFilePath(extension) {
    return `${this._basePath}/${this._componentName}.${extension}`
  }

  _getScriptPath(script) {
    return `${this._basePath}/${script}`
  }
}
