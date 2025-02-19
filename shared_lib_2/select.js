import { ERROR, SELECTOR } from './content.js'

export function select({ elementSelector } = {}) {
  const element = document.querySelector(elementSelector)

  if (!element) {
    const errorMessage = ERROR.elementNotFound(
      SELECTOR.selector,
      elementSelector
    )
    throw new Error(errorMessage)
  }

  return element
}
