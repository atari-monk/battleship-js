import { LEVEL } from './constants.js'
import format from './format.js'

export function requestFullscreen(
  element = document.documentElement,
  warningMessage = 'Fullscreen API not supported'
) {
  const request =
    element.requestFullscreen ||
    element.mozRequestFullScreen ||
    element.webkitRequestFullscreen ||
    element.msRequestFullscreen

  if (request) {
    request.call(element)
  } else {
    console.warn(format(LEVEL.WARN, warningMessage))
  }
}

export function requestFullscreenObj({
  element = document.documentElement,
  warningMessage = 'Fullscreen API not supported',
} = {}) {
  requestFullscreen(element, warningMessage)
}
