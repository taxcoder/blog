import { defineStore } from 'pinia';

const current: any = localStorage.getItem('current');

export const useBaseStore = defineStore('base', {
  state: () => {
    return {
      theme: (localStorage.getItem('theme') === 'dark') as boolean,
      current: (!isNaN(parseFloat(current)) && isFinite(current) ? parseInt(current) : 0) as number,
      openActive: (localStorage.getItem('openActive') === 'true') as boolean,
      openUserActive: (localStorage.getItem('openUserActive') !== 'false') as boolean,
    };
  },
  getters: {
    getTheme(state) {
      return state.theme;
    },
    getCurrent(state) {
      return state.current;
    },
    getOpenActive(state) {
      return state.openActive;
    },
    getOpenUserActive(state) {
      return state.openUserActive;
    },
  },
  actions: {
    setTheme(newTheme: boolean) {
      this.theme = newTheme;
    },
    setCurrent(newCurrent: number) {
      this.current = newCurrent;
    },
    setOpenActive(newOpenActive: boolean) {
      this.openActive = newOpenActive;
    },
    setOpenUserActive(newOpenUserActive: boolean) {
      this.openUserActive = newOpenUserActive;
    },
  },
  persist: {
    paths: ['theme', 'current', 'openActive', 'openUserActive'],
    storage: localStorage,
  },
});