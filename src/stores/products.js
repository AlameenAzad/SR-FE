import { defineStore } from 'pinia'
import { api } from 'boot/axios'
export const useProductsStore = defineStore('productsStore', {
  state: () => ({
    products: [
      'Loading ....'
    ],
    product: {}
  }),

  getters: {
    productNames() {
      return this.products.map((product) => ({
        id: product.id,
        name: product.name,
      }))
    },
    productNamesAndPlans() {
      return this.products.map((product) => ({
        id: product.id,
        name: product.name,
        cashPlans: product.pricing_plans.map((plan) => ({ id: plan.id, name: plan.name, meta: { amount: plan.amount, term: plan.term, type: plan.type } }))
      }))
    },
  },

  actions: {
    getProducts() {
      return api.get('/api/products').then((response) => {
        this.products = response.data.data
      })
    },
    getProduct(id) {
      return api.get(`/api/products/${id}`).then((response) => {
        this.product = response.data.data
        return response.data.data
      })
    },
    addOrUpdateProducts(data, id) {
      const url = id ? `/api/products/${id}` : '/api/products'
      return api.post(url, data).then((response) => {
        if (id) {
          this.products = this.products.filter((product) => product.id !== id)
          this.products.push(response.data.data)
        } else
          this.products = response.data.data
        return response
      })
    },
    deleteProducts(id) {
      return api.delete(`/api/products/${id}`).then((response) => {
        this.products = this.products.filter((product) => product.id !== id)
        return response
      })
    }
  }
})
