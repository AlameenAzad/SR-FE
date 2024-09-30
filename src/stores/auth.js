import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import { useDashboardStore } from './dashboard'
import { useLeaderboardStore } from './leaderboard'
import { Cookies } from 'quasar'

const cookieOption = {
  expires: '8h',
  path: '/',
  secure: true,
  sameSite: 'Strict',
}
export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: {},
    token: null,
    firstLogin: null,
    stripe: null,
    calendlyIntegrated: null,
    calendly: null,
    loadingInvitees: false,
    googleIntegrated: false,
    google: null,
  }),
  persist: {
    key: 'user',
    storage: {
      getItem: (key) => JSON.stringify(Cookies.get(key)),
      setItem: (key, value) => {
        Cookies.set(key, JSON.parse(value), cookieOption)
      },
    },
  },

  getters: {
    isAuth: (state) => !!state.token,
  },

  actions: {
    login(email, password) {
      return api
        .post('/api/login', {
          email,
          password,
        })
        .then(async (response) => {
          this.user = response.data.user
          this.token = response.data.token
          this.firstLogin = this.token.split('|')[0] <= 1
          const dashboardStore = useDashboardStore()
          const leaderboardStore = useLeaderboardStore()
          await dashboardStore.getDashboardData()
          await dashboardStore.getLogs()
          await leaderboardStore.getLeaderboards()
          await this.checkStripeIntegration()
          this.calendlyIntegrated = response.data.user.calendly_access_token
            ? true
            : false
          this.calendly = {
            accessToken: response.data.user.calendly_access_token,
            refreshToken: response.data.user.calendly_refresh_token,
            code: response.data.user.calendly_code,
            eventType: response.data.user.calendly_event_types,
          }
          this.googleIntegrated = response.data.user
            .google_calendar_access_token
            ? true
            : false
          this.google = {
            google_calendar_access_token:
              response.data.user.google_calendar_access_token,
            google_calendar_refresh_token:
              response.data.user.google_calendar_refresh_token,
            google_calendar_code: response.data.user.google_calendar_code,
          }
          return response.data
        })
        .catch((error) => error.response)
    },
    logout() {
      return api
        .post('/api/logout')
        .then(async (response) => {
          this.$reset()
          this.router.push({ name: 'login' })
          return response
        })
        .catch((error) => error.response)
    },
    updateUserInformation(username, userEmail) {
      return api
        .post('/api/updateInfo', {
          name: username,
          email: userEmail,
        })
        .then((response) => {
          this.user.name = username
          this.user.email = userEmail
          return response
        })
        .catch((error) => error)
    },
    updateUserPassword(data) {
      return api
        .post('/api/updatePassword', data)
        .then((response) => response)
        .catch((error) => error)
    },
    checkStripeIntegration() {
      return api
        .get('/api/check-stripe-integration')
        .then((response) => {
          this.stripe = response.data
          return response
        })
        .catch((error) => error)
    },
    integrateStripe(data) {
      return api
        .post('/api/integrate-stripe', data)
        .then((response) => response)
        .catch((error) => error)
    },
    integrateCalendly(code) {
      return api
        .post('/api/calendly/integrate', {
          code,
        })
        .then((response) => {
          this.calendly = {
            accessToken: response.data.data.access_token,
            refreshToken: response.data.data.refresh_token,
            code: response.data.data.calendly_code,
          }
          return response
        })
        .catch((error) => error)
    },
    getCalendlyEventTypes() {
      return api
        .get('/api/calendly/getCalendlyEventTypes')
        .then((response) => response)
        .catch((error) => error)
    },
    saveCalendlyEventType(data) {
      return api
        .post('/api/calendly/saveCalendlyEventTypes', data)
        .then((response) => {
          this.calendly.eventType = response.data.data
          return response
        })
        .catch((error) => error)
    },
    getCalendlyEventInvitees(uuid) {
      if (this.loadingInvitees) return
      this.loadingInvitees = true
      return api
        .get('/api/calendly/getCalendlyEventInvitees', {
          params: {
            uuid,
          },
        })
        .then((response) => {
          this.loadingInvitees = false
          return response
        })
        .catch((error) => error)
    },
    integrateGoogle(code) {
      api
        .post('/api/google-calendar/integrate', {
          code: code,
        })
        .then((res) => {
          let obj = {
            google_calendar_access_token: res.data.data.access_token,
            google_calendar_refresh_token: res.data.data.refresh_token,
            google_calendar_code: res.data.data.code,
          }
          this.google = obj
          this.googleIntegrated = true
        })
        .catch((e) => e.response)
    },
    refreshGoogle() {
      api
        .post('/api/google-calendar/refresh', {
          code: this.google.google_calendar_code,
        })
        .then((res) => {
          this.google.access_token = res.data.access_token
          this.google.refresh_token = res.data.refresh_token
          // this.googleIntegrated = true
        })
        .catch((e) => e.response)
    },
  },
})
