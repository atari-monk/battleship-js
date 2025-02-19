export function select({
  selector,
  elementNotFound = (selector) => elementNotFound('selector', selector),
} = {}) {
  const element = document.querySelector(selector)

  if (!element) {
    throw new Error(...format.error(elementNotFound(selector)))
  }

  return element
}
