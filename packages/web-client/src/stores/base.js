import { defineStore } from 'pinia';
const current = localStorage.getItem('current');
export const useBaseStore = defineStore('base', {
    state: () => {
        return {
            theme: (localStorage.getItem('theme') === 'dark'),
            current: (!isNaN(parseFloat(current)) && isFinite(current) ? parseInt(current) : 0),
            openActive: (localStorage.getItem('openActive') === 'true'),
            openUserActive: (localStorage.getItem('openUserActive') !== 'false'),
            isCardLoading: false,
            webSite: [],
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
        getWebSite(state) {
            return state.webSite;
        },
    },
    actions: {
        setTheme(newTheme) {
            this.theme = newTheme;
        },
        setCurrent(newCurrent) {
            this.current = newCurrent;
        },
        setOpenActive(newOpenActive) {
            this.openActive = newOpenActive;
        },
        setOpenUserActive(newOpenUserActive) {
            this.openUserActive = newOpenUserActive;
        },
        setIsCardLoading(newIsCardLoading) {
            this.isCardLoading = newIsCardLoading;
        },
        setWebSite(newWebSite) {
            this.webSite = newWebSite;
        },
    },
    persist: {
        paths: ['theme', 'current', 'openActive', 'openUserActive'],
        storage: localStorage,
    },
});
