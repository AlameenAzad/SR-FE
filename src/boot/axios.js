import { boot } from 'quasar/wrappers'
import axios from 'axios'
import { useAuthStore } from 'stores/auth'
// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)

let api = axios.create()
if (process.env.PROD) {
  api = axios.create(
    { baseURL: 'https://david.salesrank.io' }
  )
}
export default boot(({ store }) => {
  const authStore = useAuthStore(store)
  // Add a request interceptor
  api.interceptors.request.use(
    (config) => {
      // Get the authorization token from the store
      const token = authStore.token
      // Add the authorization token to the request headers
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }

      return config
    },
    (error) => Promise.reject(error))
})

export { api, axios }
