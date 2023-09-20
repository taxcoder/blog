import { defineStore } from 'pinia';
export const useGlobalStore = defineStore('global', {
  state: () => {
    return {
      isOpenDrawer: false,
      isCardLoading: false,
      webSite: {},
      isContract: false,
    };
  },
  getters: {
    getIsOpenDrawer(state) {
      return state.isOpenDrawer;
    },
    getIsCardLoading(state) {
      return state.isCardLoading;
    },
    getWebSite(state) {
      return state.webSite;
    },
    getIsContract(state) {
      return state.isContract;
    },
  },
  actions: {
    setIsOpenDrawer(newIsOpenDrawer) {
      this.isOpenDrawer = newIsOpenDrawer;
    },
    setIsCardLoading(newIsCardLoading) {
      this.isCardLoading = newIsCardLoading;
    },
    setWebSite(newWebSite) {
      let tags = this.webSite.tags;
      this.webSite = newWebSite;
      this.webSite.tags = tags;
    },
    setWebSiteTags(newWebSiteTags) {
      this.webSite.tags = newWebSiteTags;
    },
    setIsContract(newIsContract) {
      this.isContract = newIsContract;
    },
  },
});
