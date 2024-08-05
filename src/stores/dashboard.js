import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import { date } from 'quasar'

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    counter: 0,
    dashboard: null,
    team: null,
    activity: null,
    summary: null,
    monthToDate: null,
    money: null,
    moneyReps: null,
    closingRates: null,
    totalUnits: null,
    selectedMeeting: null,
    logs: null,
    unloggedEvents: null
  }),
  persist: {
    key: 'dashboard',
    storage: localStorage
  },
  getters: {
    data (state) {
      return state.dashboard
    },
    reps (state) {
      return state.team
    }
  },

  actions: {
    async getDashboardData (dateParam) {
      const link = dateParam ? '/api/dashboard?' + dateParam: '/api/dashboard'
      return api.get(link).then((response) => {
        this.dashboard = response.data
        this.team = response.data.team
        this.activity = response.data.activity
        this.summary = response.data.summary
        this.monthToDate = response.data.month_to_date
        this.money = response.data.money
        this.closingRates = response.data.closing_rates
        this.moneyReps = { ...response.data.money.reps.items }
        this.totalUnits = { ...response.data.total_units.items }
        delete this.money.reps
      }).catch((error) => error.response)
    },
    async getCalendlySchedules(params) {
      return api.get('/api/calendly/getData', {
        params
      }).then((response) => response.data).catch((error) => error.response)
    },
    async refreshCalendlyToken() {
      return api.post('/api/calendly/refresh').then((response) => response.data).catch((error) => error.response)
    },
    async getLogs() {
      return api.get('/api/log').then((response) => {
        this.logs = response.data.data.filter(log => log.event !== null)
      }).catch((error) => error.response)
    },
    logCards(payload) {
      let condition = null
      let offerCondition = 'testing'
      if (payload === 'Unlogged') {
        return this.unloggedEvents?.map(event => ({
          id: event.calendar_event.external_id,
          type: 'draggable',
          props: {
            className: 'card',
            style: { backgroundColor: '#181818' }
          },
          data: event.name,
          event
        }))
      }
      if (payload === 'No Show') condition = 'No Show'
      if (payload === 'Second Call Booked') condition = 'Second Call Booked'
      if (payload === 'Lost') offerCondition = 'Lost'
      if (payload === 'Second Call Booked [ Offered ]') offerCondition = 'Second Call Booked'
      if (payload === 'Won') offerCondition = 'Sale'

      return this.logs?.filter(log => log.call_result === condition || log.offer_result === offerCondition)
        .map(log => ({
          id: log.id,
          type: 'draggable',
          props: {
            className: 'card',
            style: { backgroundColor: '#181818' }
          },
          data: log.event.event_name,
          log
        }))
    },
    async getUnloggedEvents() {
      const scheduleDate = new Date('2024-05-01')
      scheduleDate.setHours(0, 0, 0, 0)
      const nextDayDate = date.addToDate(scheduleDate, { day: 30 })
      nextDayDate.setHours(0, 0, 0, 0)
      const params = {
        from_date: date.formatDate(scheduleDate, 'YYYY-MM-DDTHH:mm:ss.SSSSSS[Z]'),
        to_date: date.formatDate(nextDayDate, 'YYYY-MM-DDTHH:mm:ss.SSSSSS[Z]'),
        count: 100,
        status: 'active'
      }
      const eventIds = this.logs.map(log => log.event.event_id)
      this.getCalendlySchedules(params).then((response) => {
        this.unloggedEvents = response.filter(event => event.calendar_event.external_id && !eventIds.includes(event.calendar_event.external_id))
      })
    }
  }
})
