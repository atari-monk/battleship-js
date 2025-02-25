export class GUIComponentUnloader {
  set basePath(basePath) {
    this._basePath = basePath
  }

  set componentName(componentName) {
    this._componentName = componentName
  }

  unloadHtml() {
    const container = document.querySelector(`.${this._componentName}`)
    if (container) {
      container.remove()
    }
  }

  unloadCss() {
    const cssLink = document.querySelector(
      `link[href$="${this._componentName}.css"]`
    )
    if (cssLink) {
      cssLink.remove()
    }
  }

  unloadScripts(scripts) {
    scripts.forEach((script) => this.unloadScript(script))
  }

  unloadScript(script) {
    const scriptElement = document.querySelector(`script[src$="${script}"]`)
    if (scriptElement) {
      scriptElement.remove()
    }
  }

  unloadJsModule() {
    try {
      delete require.cache[
        require.resolve(`${this.basePath}/${this._componentName}.js`)
      ]
    } catch (error) {
      console.error(
        `Error unloading JS module for component: ${this._componentName}`,
        error
      )
    }
  }
}
