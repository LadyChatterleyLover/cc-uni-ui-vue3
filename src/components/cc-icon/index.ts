import { App } from 'vue'

import Icon from './cc-icon.vue'

export default {
  install(app: App) {
    app.component('cc-icon', Icon)
  },
}
