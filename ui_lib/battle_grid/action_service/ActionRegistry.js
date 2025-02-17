export class ActionRegistry {
  constructor() {
    this._actions = new Map()
  }

  register(actionName, actionFn) {
    this._actions.set(actionName, actionFn)
  }

  getAction(actionName) {
    return this._actions.get(actionName)
  }
}
