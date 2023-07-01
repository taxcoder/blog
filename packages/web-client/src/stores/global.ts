import { defineStore } from 'pinia';

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

export const useGlobalStore = defineStore('global', {
  state: () => {
    return {
      isOpenDrawer: false,
      isCardLoading: false as boolean,
      webSite: {} as WebSite,
    };
  },
  getters: {
    getIsOpenDrawer(state) {
      return state.isOpenDrawer;
    },
    getIsCardLoading(state) {
      return state.isCardLoading;
    },
    getWebSite(state): WebSite {
      return state.webSite;
    },
  },
  actions: {
    setIsOpenDrawer(newIsOpenDrawer: boolean) {
      this.isOpenDrawer = newIsOpenDrawer;
    },
    setIsCardLoading(newIsCardLoading: boolean) {
      this.isCardLoading = newIsCardLoading;
    },
    setWebSite(newWebSite: Array<WebSite>) {
      this.webSite = newWebSite;
    },
  },
});