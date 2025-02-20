import { LEVEL } from './constants.js'
import format from './format.js'

export async function loadComponents(
  uiContainer,
  componentName,
  cssClass,
  elements = [],
  errorMessage = `Failed to load component: ${componentName} with class: ${cssClass} and ID: `
) {
  try {
    await uiContainer.loadComponentResources(componentName)

    const instances = await Promise.all(
      elements.map(async (element) => {
        const { elementId, type } = element
        try {
          const { jsInstance } = await uiContainer.createInstance(
            componentName,
            cssClass,
            elementId,
            type
          )
          return jsInstance
        } catch (error) {
          console.error(format(LEVEL.ERROR, errorMessage + elementId, error))
          return null
        }
      })
    )

    return instances.filter((instance) => instance !== null)
  } catch (error) {
    console.error(format(LEVEL.ERROR, errorMessage, error))
    throw error
  }
}

export async function loadComponentsObj({
  uiContainer,
  componentName,
  cssClass,
  elements = [],
  errorMessage = `Failed to load component: ${componentName} with class: ${cssClass} and ID: `,
} = {}) {
  return loadComponents(
    uiContainer,
    componentName,
    cssClass,
    elements,
    errorMessage
  )
}
