import { format } from './LogFormatter.js'

const defaultNotFoundMsg = (identifierType, identifier) =>
  `Element with ${identifierType} "${identifier}" not found`

export function toggle({
  selector,
  cssClass,
  forceState,
  notFoundMsg = (selector) => defaultNotFoundMsg('selector', selector),
} = {}) {
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

export function setEvent({
  id,
  eventType = 'click',
  handler,
  notFoundMsg = (id) => defaultNotFoundMsg('id', id),
} = {}) {
  const el = document.getElementById(id)

  if (el) {
    el.addEventListener(eventType, handler)
  } else {
    console.warn(...format.warn(notFoundMsg(id)))
  }
}

export function requestFullscreen({
  element = document.documentElement,
  warningMessage = 'Fullscreen API not supported',
} = {}) {
  const request =
    element.requestFullscreen ||
    element.mozRequestFullScreen ||
    element.webkitRequestFullscreen ||
    element.msRequestFullscreen

  if (request) {
    request.call(element)
  } else {
    console.warn(...format.warn(warningMessage))
  }
}

export async function showComponent({
  uiContainer,
  componentName,
  cssClass,
  elementId,
  errorMessage = `Failed to load component: ${componentName} with class: ${cssClass} and ID: ${elementId}.`,
} = {}) {
  try {
    await uiContainer.loadComponentResources(componentName)
    uiContainer.createInstance(componentName, cssClass, elementId)
  } catch (error) {
    console.error(...format.error(errorMessage, error))
  }
}
