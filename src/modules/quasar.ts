import { App } from 'vue'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'

import { Quasar, Notify, LocalStorage, Dialog } from 'quasar'

const config = {
  plugins: { Notify, LocalStorage, Dialog },
}

export const install = (app: App) => {
  Notify.setDefaults({
    actions: [{ icon: 'close', color: 'white' }],
  })
  app.use(Quasar, config)
}
