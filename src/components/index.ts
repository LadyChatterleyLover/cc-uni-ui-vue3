import { App } from 'vue'
import ccIcon from './cc-icon'

const components = [ccIcon]

export default {
  install(app: App) {
    components.map((c) => {
      app.use(c)
    })
  },
}
