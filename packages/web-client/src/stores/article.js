import { defineStore } from 'pinia';
let size = localStorage.getItem('pageSize');
let current = localStorage.getItem('current');
export const useArticleStore = defineStore('article', {
  state: () => {
    return {
      articleList: {},
      pageSize: size,
      current: !isNaN(parseFloat(current)) && isFinite(current) ? parseInt(current) : 1,
      directory: [],
    };
  },
  getters: {
    getArticleList(state) {
      return state.articleList;
    },
    getPageSize(state) {
      return state.pageSize;
    },
    getCurrent(state) {
      return state.current;
    },
    getDirectory(state) {
      return state.directory;
    },
  },
  actions: {
    setArticleList(newArticleList) {
      this.articleList = newArticleList;
    },
    setPageSize(newPageSize) {
      this.pageSize = newPageSize;
    },
    setCurrent(newCurrent) {
      this.current = newCurrent;
    },
    setDirectory(newDirectory) {
      this.directory = newDirectory;
    },
  },
  persist: {
    key: 'article',
    paths: ['current', 'pageSize', 'directory'],
  },
});
