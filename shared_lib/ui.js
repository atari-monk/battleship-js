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

export function selectAll(selector) {
  const elements = document.querySelectorAll(selector)
  if (!elements) {
    console.warn(...format.warn(defaultNotFoundMsg('selector', selector)))
  }
  return elements
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

export function toggleGrids(currentPlayer, player1Name, gridIds, hiddenStyle) {
  const [id1, id2] = gridIds
  const isPlayer1 = currentPlayer === player1Name

  const activeGrid = isPlayer1 ? id1 : id2
  const inactiveGrid = isPlayer1 ? id2 : id1

  toggleGrid(activeGrid, true, hiddenStyle)
  toggleGrid(inactiveGrid, false, hiddenStyle)
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

export async function loadComponents({
  uiContainer,
  componentName,
  cssClass,
  elements = [],
  errorMessage = `Failed to load component: ${componentName} with class: ${cssClass} and ID: `,
} = {}) {
  try {
    await uiContainer.loadComponentResources(componentName)

    const instances = elements.map((element) => {
      try {
        const { elementId, type } = element
        const { jsInstance } = uiContainer.createInstance(
          componentName,
          cssClass,
          elementId,
          type
        )
        return jsInstance
      } catch (error) {
        console.error(...format.error(errorMessage + elementId, error))
        return null
      }
    })

    return instances.filter((instance) => instance !== null)
  } catch (error) {
    console.error(...format.error(errorMessage, error))
  }
}

export function generateElements({
  parentElement,
  numElements = 100,
  elementType = 'div',
  childCssClassName = '',
}) {
  if (!parentElement) {
    throw new Error('A valid parent element must be provided.')
  }

  for (let i = 1; i <= numElements; i++) {
    const element = document.createElement(elementType)
    if (childCssClassName) {
      element.classList.add(childCssClassName)
    }
    parentElement.appendChild(element)
  }
}

export function matrixToScreen({ gridRect, cellSize, row, col }) {
  return {
    x: gridRect.left + col * cellSize.width + cellSize.width / 2,
    y: gridRect.top + row * cellSize.height + cellSize.height / 2,
  }
}

export function getRelativeCoordinates(event, rect) {
  return {
    x: event.x - rect.left,
    y: event.y - rect.top,
  }
}

export function getCellPosition(x, y, cellSize) {
  const col = Math.floor(x / cellSize.width)
  const row = Math.floor(y / cellSize.height)
  return { row, col, index: row * 10 + col }
}

export function getCellPosition2(x, y, cellSize) {
  const col = Math.floor(x / cellSize.width)
  const row = Math.floor(y / cellSize.height)
  return { row, col, index: row * 10 + col + 1 }
}
