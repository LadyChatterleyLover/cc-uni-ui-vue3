import { App } from 'vue'
import ccButton from './cc-button'
import ccIcon from './cc-icon'

const components = [ccIcon, ccButton]

export default {
  install(app: App) {
    components.map((c) => {
      app.use(c)
    })
  },
}
