import { format } from './LogFormatter.js'

export function toggleClass(
  selector,
  cssClass,
  forceState,
  notFoundMsg = (selector) => `Element with selector "${selector}" not found`
) {
  const el = document.querySelector(selector)

  if (!el) {
    console.warn(...format.warn(notFoundMsg(selector)))
    return
  }

  if (typeof forceState === 'boolean') {
    return el.classList.toggle(cssClass, forceState)
  } else {
    return el.classList.toggle(cssClass)
  }
}
