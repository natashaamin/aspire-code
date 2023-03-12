/// <reference types="vite/client" />
/// <reference types="vite-plugin-pages/client" />
/// <reference types="vite-svg-loader" />
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'velocity-animate'

interface ImportMetaEnv {
  readonly VITE_APP_PORT: string
  readonly VITE_APP_HOST: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
