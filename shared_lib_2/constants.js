export const TYPE = Object.freeze({
  STRING: 'string',
  BOOL: 'boolean',
  NULL: 'null',
  OBJECT: 'object',
})

export const LEVEL = Object.freeze({
  DEBUG: 'debug',
  WARN: 'warn',
  ERROR: 'error',
})

export const CONSOLE_COLOR = Object.freeze({
  CYAN: '\x1b[36m',
  YELLOW: '\x1b[33m',
  RED: '\x1b[31m',
  RESET: '\x1b[0m',
})

export const EVENT = {
  MOUSE_MOVE: 'mousemove',
  MOUSE_ENTER: 'mouseenter',
  TOUCH_MOVE: 'touchmove',
  TOUCH_START: 'touchstart',
  CLICK: 'click',
  WHEEL: 'wheel',
}

export const LANGUAGE = Object.freeze({
  EN: 'en',
  PL: 'pl',
})
