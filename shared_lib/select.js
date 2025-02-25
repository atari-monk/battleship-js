import { ERROR, SELECTOR } from './content.js'

export function getById(id) {
  const element = document.getElementById(id)
  if (!element) throw new Error(ERROR.element.notFound(SELECTOR.id, id))
  return element
}

export function getByIdObj({ id }) {
  return getById(id)
}

export function query(selector) {
  const element = document.querySelector(selector)
  if (!element)
    throw new Error(ERROR.element.notFound(SELECTOR.selector, selector))
  return element
}

export function queryObj({ selector }) {
  return query(selector)
}

export function queryAll(selector) {
  const elements = document.querySelectorAll(selector)
  if (!elements) {
    throw new Error(ERROR.element.notFound(SELECTOR.selector, selector))
  }
  return elements
}
