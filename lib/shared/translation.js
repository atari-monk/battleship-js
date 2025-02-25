import { LANGUAGE } from './constants.js'

let currentLanguage = LANGUAGE.PL

export const getLanguage = () => currentLanguage

export const setLanguage = (lang) => {
  if (Object.values(LANGUAGE).includes(lang)) {
    currentLanguage = lang
  } else {
    console.warn(`Language "${lang}" not supported. Falling back to English.`)
    currentLanguage = LANGUAGE.EN
  }
}

export const CONTENT = Object.freeze({
  [LANGUAGE.EN]: {
    selector: {
      id: 'id',
      selector: 'selector',
    },
    error: {
      element: {
        notFound: (identifierType, identifier) =>
          `Element with ${identifierType} "${identifier}" not found`,
        invalid: 'Invalid DOM element provided',
      },
      cssClass: {
        invalid: 'A valid CSS class name must be provided',
      },
    },
  },
  [LANGUAGE.PL]: {
    selector: {
      id: 'identyfikator',
      selector: 'selektor',
    },
    error: {
      element: {
        notFound: (identifierType, identifier) =>
          `Element z ${identifierType} "${identifier}" nie znaleziony`,
        invalid: 'Nieprawidłowy element DOM',
      },
      cssClass: { invalid: 'Należy podać prawidłową nazwę klasy CSS' },
    },
  },
})
