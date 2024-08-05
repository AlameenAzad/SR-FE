import { defineStore } from 'pinia'
import { api } from 'boot/axios'
export const useLeaderboardStore = defineStore('leaderboard', {
  state: () => ({
    leaderboard: [],
  }),

  getters: {
  },

  actions: {
    getLeaderboards () {
      return api.get('/api/leaderboard').then((response) => {
        this.leaderboard = response.data.data
      })
    },
  }
})
