import { defineStore } from 'pinia'
import { api } from 'boot/axios'
export const useAccountsStore = defineStore('accountsStore', {
  state: () => ({
    accounts: []
  }),

  getters: {
    accountsSimplified() {
      return this.accounts.map((account) => {
        const { name, email, phone_number, product, created_at, id, paymentMethods, loadingPM, payments } = account
        const hasOverDue = payments.some(payment => payment.overdue)
        const map = {
          name,
          email,
          regDate: created_at.split('T')[0],
          phone: phone_number,
          id,
          paymentMethods,
          loadingPM,
          hasOverDue,
          payments
        }
        return product ? { ...map, product: product.name, productId: product.id } : map
      })
    }
  },

  actions: {
    getAccounts() {
      return api.get('/api/accounts').then((response) => {
        this.accounts = response.data.data
      })
    },
    addOrUpdateAccounts(data, id) {
      const url = id ? `/api/accounts/${id}` : '/api/accounts'
      return api.post(url, data).then((response) => {
        if (id)
          this.accounts = this.accounts.filter((account) => account.id !== id)
        this.accounts.push(response.data.data)
        return response
      })
    },
    deleteAccounts(id) {
      return api.delete(`/api/accounts/${id}`,).then((response) => {
        this.accounts = this.accounts.filter((account) => account.id !== id)
        return response
      })
    },
    getAccountPaymentMethods(id) {
      const account = this.accounts.filter((account) => account.id === id)
      account[0].loadingPM = true
      return api.post('/api/payment-methods', { 'account_id': id }).then((response) => {
        account[0].paymentMethods = { methods: response.data.payment_methods, intent: response.data.intent }
        account[0].loadingPM = false
        return { account: account[0], paymentsMethods: response.data.payment_methods, intent: response.data.intent }
      })
    },
    addPaymentMethod(id) {
      return api.post('/api/add-payment-method', { 'account_id': id }).then((response) => response.data)
    },
    getBillingPortalLink(id) {
      return api.post('/api/billing-portal', { 'account_id': id }).then((response) => response.data)
    },
    chargeAccount(id, data) {
      data.amount = parseInt(data.amount)
      return api.post('/api/stripe', { 'account_id': id, ...data }).then((response) => response.data)
    },
  }
})
