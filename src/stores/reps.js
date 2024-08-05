import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const useRepsStore = defineStore('repsStore', {
  state: () => ({
    allReps: [],
    repTypes: [],
    closers: [],
    setters: [],
  }),

  getters: {
  },

  actions: {
    addRep (data) {
      return api.post('/api/createUser', data).then((response) => {
        this.allReps.push(response.data.data)
        return response
      })
    },
    getAllReps () {
      return api.get('/api/getAllUsers').then((response) => {
        this.allReps = response.data.data
        return response
      })
    },
    getClosers () {
      return api.get('/api/closers').then((response) => {
        this.closers = response.data.data
        return response
      })
    },
    getSetters () {
      return api.get('/api/setters').then((response) => {
        this.setters = response.data.data
        return response
      })
    },
    getRepTypes () {
      if(this.repTypes.length) return
      return api.get('/api/user-types').then((response) => {
        this.repTypes = response.data.data
        return response
      })
    },
    updateRep (data) {
      return api.post('/api/updateUserInfo', data).then((response) => response)
    },
    matchup (firstRep, secondRep) {
      return api.get(`/api/match-up?first_user=${firstRep}&second_user=${secondRep}`).then((response) => response)
    }
  }
})
