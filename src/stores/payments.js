import { defineStore } from 'pinia'
import { api } from 'boot/axios'
export const usePaymentsStore = defineStore('paymentsStore', {
  state: () => ({
    payments: []
  }),

  getters: {
  },

  actions: {
    getPayments(filters = '') {
      return api.get(`/api/payments${filters}`).then((response) => {
        this.payments = response.data.data
      })
    },
    updatePayment(id) {
      const data = {
        is_paid: true,
        _method: 'PUT'
      }
      return api.post(`/api/payments/${id}`, data).then((response) => response.data.data)
    },
  }
})
