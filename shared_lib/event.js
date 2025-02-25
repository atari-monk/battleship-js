import { EVENT } from './constants.js'

export function setEvent(
  element,
  handler,
  eventType = EVENT.CLICK,
  isPassive = false
) {
  const options = isPassive ? { passive: true } : undefined
  element.addEventListener(eventType, handler, options)
}

export function setEventObj({
  element,
  handler,
  eventType = EVENT.CLICK,
  isPassive = false,
}) {
  return setEvent(element, handler, eventType, isPassive)
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
