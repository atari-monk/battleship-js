import { CONTENT, getLanguage } from './translation.js'

export const SELECTOR = {
  get id() {
    const content = CONTENT[getLanguage()]
    return content.selector.id
  },
  get selector() {
    const content = CONTENT[getLanguage()]
    return content.selector.selector
  },
}

export const ERROR = {
  element: {
    notFound: (identifierType, identifier) => {
      const content = CONTENT[getLanguage()]
      return content.error.element.notFound(identifierType, identifier)
    },
    invalid: () => {
      const content = CONTENT[getLanguage()]
      return content.error.element.invalid
    },
  },
  cssClass: {
    invalid: () => {
      const content = CONTENT[getLanguage()]
      return content.error.cssClass.invalid
    },
  },
}
