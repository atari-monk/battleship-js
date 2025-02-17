export class ActionExecutor {
  constructor(actionRegistry, actionResolver) {
    this._actionRegistry = actionRegistry
    this._actionResolver = actionResolver
  }

  execute() {
    const actionName = this._actionResolver.resolve()
    const action = this._actionRegistry.getAction(actionName)
    if (action) {
      action()
    } else {
      throw new Error(`No action registered for: ${actionName}`)
    }
  }
}
