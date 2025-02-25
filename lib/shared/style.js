import { TYPE } from './constants.js'
import { ERROR } from './content.js'

export function toggle(element, cssClass, forceState) {
  if (!element) {
    throw new Error(ERROR.element.invalid)
  }
  if (typeof cssClass !== TYPE.STRING || !cssClass.trim()) {
    throw new Error(ERROR.cssClass.invalid)
  }

  return element.classList.toggle(
    cssClass,
    typeof forceState === TYPE.BOOL ? forceState : undefined
  )
}

export function toggleObj({ element, cssClass, forceState }) {
  return toggle(element, cssClass, forceState)
}

export function updateColor({ element, isOn, isOnColor, isOffColor }) {
  element.style.backgroundColor = isOn ? isOnColor : isOffColor
}
