import axios from 'axios'
import { LocalStorage, Notify } from 'quasar'
import router from 'src/router'

const parseError = (result: any) => {
  if (result.status === 401) {
    LocalStorage.set('lastUrl', router.currentRoute.value.fullPath)
    setTimeout(() => {
      router.push({
        name: 'login',
        params: { redirect: router.currentRoute.value.fullPath },
      })
    }, 350)
  } else {
    Notify.create({
      type: 'warning',
      position: 'top',
      message: result.message,
    })
  }
}

const api = axios.create({})

api.interceptors.request.use((req) => {
  return req
})

api.interceptors.response.use(
  (res) => {
    return res.data
  },
  async (err) => {
    const response = err.response
    parseError(response.data)
    return Promise.reject(response)
  }
)

export { api, axios }
