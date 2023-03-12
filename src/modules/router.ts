import router from 'src/router'
import { App } from 'vue'

export const install = (app: App) => {
  app.use(router)
}
