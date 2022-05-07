import { App } from 'vue'

import Button from './cc-button.vue'

export default {
  install(app: App) {
    app.component('cc-button', Button)
  },
}
