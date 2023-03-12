import { appTypography } from './src/theme/typography/index'
import { defineConfig } from 'vite-plugin-windicss'
import typography from 'windicss/plugin/typography'
import formsPlugin from 'windicss/plugin/forms'

export default defineConfig({
  safelist: 'p-1 p-2 p-3 p-4',
  theme: {
    extend: {
      colors: {
        brand: '#01D167',
        'dark-blue': '#0C365A',
        'dark-blue-1': '#325BAF',
        cyan: '#23CEFD',
        grey: '#DDDDDD',
        'grey-1': '#F5F5F5',
        'grey-2': '#AAAAAA',
        'light-green': '#EDFFF5',
        'light-green-1': '#DDFFEC',
        'light-green-2': '#00D6B51A',
        'light-blue': '#EDF3FF',
        'light-blue-1': '#FAFCFF',
        'light-blue-2': '#009DFF1A',
        'light-red': '#F251951A',
      },
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
        serif: ['Open Sans', 'sans-serif'],
        mono: ['Open Sans', 'sans-serif'],
        display: ['Open Sans', 'sans-serif'],
        body: ['Open Sans', 'sans-serif'],
      },
      typography: appTypography,
    },
  },
  plugins: [typography(), formsPlugin],
})
