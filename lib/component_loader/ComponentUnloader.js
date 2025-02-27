export class ComponentUnloader {
  setConfig(basePath, componentName) {
    if (!basePath || !componentName) {
      throw new Error('basePath and componentName are required')
    }
    this._basePath = basePath
    this._componentName = componentName
  }

  _removeElement(selector) {
    const element = document.querySelector(selector)
    if (element) {
      element.remove()
    }
  }

  unloadCss() {
    this._removeElement('.' + this._componentName)
  }

  unloadCss() {
    this._removeElement(`link[href$="${this._componentName}.css"]`)
  }

  unloadScripts(scripts) {
    scripts.forEach((script) => this._removeElement(`script[src$="${script}"]`))
  }

  unloadScripts() {
    try {
      delete require.cache[
        require.resolve(`${this._basePath}/${this._componentName}.js`)
      ]
    } catch (error) {
      console.error(
        `Error unloading JS module for component: ${this._componentName}`,
        error
      )
    }
  }
}
