import { defineStore } from 'pinia';

const current: any = localStorage.getItem('current');

interface WebSite {
  webSiteId: string;
  webSiteName: string;
  webSiteAuthor: string;
  webSiteDescription: string;
  webSiteBoard: string;
  webSiteCreateTime: number;
  webSiteAllFontCount: number;
  webSiteAllAccessCount: number;
  webSiteUpdateTime: number;
  webSiteFilings: string;
}

export const useBaseStore = defineStore('base', {
  state: () => {
    return {
      theme: (localStorage.getItem('theme') === 'dark') as boolean,
      current: (!isNaN(parseFloat(current)) && isFinite(current) ? parseInt(current) : 0) as number,
      openActive: (localStorage.getItem('openActive') === 'true') as boolean,
      openUserActive: (localStorage.getItem('openUserActive') !== 'false') as boolean,
      isCardLoading: false as boolean,
      webSite: {} as WebSite,
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
    getIsCardLoading(state) {
      return state.isCardLoading;
    },
    getWebSite(state): WebSite {
      return state.webSite;
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
    setIsCardLoading(newIsCardLoading: boolean) {
      this.isCardLoading = newIsCardLoading;
    },
    setWebSite(newWebSite: Array<WebSite>) {
      this.webSite = newWebSite;
    },
  },
  persist: {
    paths: ['theme', 'current', 'openActive', 'openUserActive'],
    storage: localStorage,
  },
});