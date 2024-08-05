import { defineStore } from 'pinia'
import { api } from 'boot/axios'
export const usePathStore = defineStore('path', {
  state: () => ({
    metrics: null
  }),

  getters: {
    doubleCount (state) {
      return state.counter * 2
    }
  },

  actions: {
    getMetrics() {
      return api.get('/api/metrics').then((response) => {
        console.log('🚀 ~ returnapi.get ~ response:', response)
        this.metrics = response.data.data
        return response.data.data
      })
    },
    addMetric(metric) {
      const url = metric.id ? `/api/metrics/${metric.id}` : '/api/metrics'
      return api.post(url, metric).then((response) => {
        this.metrics.push(response.data.data)
        return response
      })
    },
    deleteMetric(id) {
      return api.delete(`/api/metrics/${id}`).then((response) => response)
    }
  }
})
