import { resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import VueI18n from '@intlify/vite-plugin-vue-i18n'
import svgLoader from 'vite-svg-loader'

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), '') }
  return defineConfig({
    plugins: [
      vue({ template: { transformAssetUrls } }),
      svgLoader({
        defaultImport: 'component'
      }),
      quasar({ sassVariables: 'src/assets/style/quasar-variables.scss' }),
      Pages({
        nuxtStyle: true,
        dirs: [
          { dir: 'src/pages', baseRoute: '' },
          { dir: 'src/pages/blank', baseRoute: '' },
        ],
      }),
      Layouts(),
      WindiCSS(),
      VueI18n({
        include: resolve(__dirname, './src/locales/**'),
      }),
    ],
    resolve: {
      alias: {
        src: resolve(__dirname, 'src'),
        '@': resolve(__dirname, 'src'),
      },
    },
    server: {
      https: false,
      port: Number(process.env.VITE_APP_PORT) || 3001,
      host: process.env.VITE_APP_HOST || '0.0.0.0',
    },
    build: {
      chunkSizeWarningLimit: 1024,
    },
  })
}
