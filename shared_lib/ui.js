import { format } from './LogFormatter.js'

const defaultNotFoundMsg = (identifierType, identifier) =>
  `Element with ${identifierType} "${identifier}" not found`

export function selectElementOrThrow({
  selector,
  isId = false,
  notFoundMsg = defaultNotFoundMsg,
} = {}) {
  const element = isId
    ? document.getElementById(selector)
    : document.querySelector(selector)

  if (!element) {
    const errorMsg = notFoundMsg(isId ? 'id' : 'selector', selector)
    console.error(...format.error(errorMsg))
    throw new Error(errorMsg)
  }

  return element
}

export function selectById({ id } = {}) {
  const element = document.getElementById(id)
  if (!element) {
    console.warn(...format.warn(defaultNotFoundMsg('id', id)))
  }
  return element
}

export function toggle({ element, cssClass, forceState } = {}) {
  if (typeof forceState === 'boolean') {
    return element.classList.toggle(cssClass, forceState)
  } else {
    return element.classList.toggle(cssClass)
  }
}

export function toggleGrid(gridId, state, hiddenStyle = 'hidden') {
  toggle({
    element: selectById({ id: gridId }),
    cssClass: hiddenStyle,
    forceState: state,
  })
}

export function selectAndToggle({
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
  isPassive = false,
  notFoundMsg = (id) => defaultNotFoundMsg('id', id),
} = {}) {
  const el = document.getElementById(id)

  if (el) {
    isPassive
      ? el.addEventListener(eventType, handler, { passive: true })
      : el.addEventListener(eventType, handler)
  } else {
    console.warn(...format.warn(notFoundMsg(id)))
  }
}

export function setEventForElement({
  element,
  eventType = 'click',
  handler,
  isPassive = false,
  notFoundMsg = (el) => defaultNotFoundMsg('element', el),
} = {}) {
  if (element) {
    isPassive
      ? element.addEventListener(eventType, handler, { passive: true })
      : element.addEventListener(eventType, handler)
  } else {
    console.warn(...format.warn(notFoundMsg(element)))
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

export function observeVisibilityChange(element, callback) {
  const observer = new IntersectionObserver((entries) => {
    const entry = entries[0]
    if (entry.isIntersecting) {
      callback()
    }
  })

  observer.observe(element)
}

export function generateElements({
  parentElement,
  numElements = 100,
  elementType = 'div',
  className = '',
}) {
  if (!parentElement) {
    throw new Error('A valid parent element must be provided.')
  }

  for (let i = 1; i <= numElements; i++) {
    const element = document.createElement(elementType)
    if (className) {
      element.classList.add(className)
    }
    parentElement.appendChild(element)
  }
}
