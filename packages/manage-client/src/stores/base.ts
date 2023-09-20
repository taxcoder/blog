import { defineStore } from 'pinia';

export const useBaseStore = defineStore('base', {
  state: () => {
    return {
      open: false,
      breakpoint: false,
      clickRouterList: [] as { name: string; url: string }[],
      fullScreen: false,
      currentListIndex: 0,
    };
  },
  getters: {
    getOpen(state) {
      return state.open;
    },
    getBreakpoint(state) {
      return state.breakpoint;
    },
    getClickRouterList(state) {
      return state.clickRouterList;
    },
    getFullScreen(state) {
      return state.fullScreen;
    },
    getCurrentListIndex(state) {
      return state.currentListIndex;
    },
  },
  actions: {
    setOpen(newOpen: boolean) {
      this.open = newOpen;
    },
    setBreakpoint(newBreakpoint: boolean) {
      this.breakpoint = newBreakpoint;
    },
    pushClickRouterList(newRouter: { name: string | symbol; url: string }) {
      let list = this.clickRouterList.filter((list: { name: string; url: string }) => list.name === newRouter.name);
      if (list.length === 0) this.clickRouterList.push(newRouter);
    },
    removeClickRouterList(index: number) {
      this.clickRouterList.splice(index, 1);
    },
    initClickRouterList(newRouter: { name: string | symbol; url: string }) {
      this.clickRouterList = [newRouter];
    },
    setFullScreen(newFullScreen: boolean) {
      this.fullScreen = newFullScreen;
    },
    setCurrentListIndex(newIndex: number) {
      this.currentListIndex = newIndex;
    },
  },
  persist: {
    key: 'base',
    paths: ['open', 'clickRouterList', 'fullScreen', 'currentListIndex'],
  },
});