import { GUIComponentLoader } from './gui_component/GUIComponentLoader.js'
import { GUIComponentUnloader } from './gui_component/GUIComponentUnloader.js'
import { GUIComponentStorage } from './gui_component/GUIComponentStorage.js'
import { GUIComponentContainer } from './gui_component/GUIComponentContainer.js'
import { GUIInstanceStorage } from './gui_component/GUIInstanceStorage.js'

export class GUIContainerFactory {
  generete(basePath) {
    const componentLoader = new GUIComponentLoader()
    const componentUnloader = new GUIComponentUnloader()
    const componentStorage = new GUIComponentStorage()
    const instanceStorage = new GUIInstanceStorage()
    const container = new GUIComponentContainer(
      componentLoader,
      componentUnloader,
      componentStorage,
      instanceStorage
    )
    container.basePath = basePath
    return container
  }
}
