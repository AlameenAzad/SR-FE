import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
  state: () => ({
    leftDrawer: false,
    spinner: true,
  }),
  persist: true,

  // getters: {
  //   getDrawerState(state) {
  //     return state.leftDrawer;
  //   },
  // },

  actions: {
    toggleLeftDrawer() {
      this.leftDrawer = !this.leftDrawer;
    },
    toggleSpinner() {
      this.spinner = !this.spinner;
    },
  },
});
