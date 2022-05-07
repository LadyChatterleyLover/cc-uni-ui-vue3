import { createSSRApp } from 'vue'
import App from './App.vue'
import ccUI from './components'
import './uni.scss'
export function createApp() {
  const app = createSSRApp(App)
  app.use(ccUI)
  return {
    app,
  }
}
