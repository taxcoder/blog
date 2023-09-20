import { defineStore } from 'pinia';

interface WebSite {
  // 网站ID
  id: string;
  // 网站名称
  name: string;
  // 头像（base64）
  headIcon: string;
  // 作者
  userName: string;
  // 格言，副标题
  motto: string;
  // 网站备案号
  forTheRecord: string;
  // 公告栏
  bulletinBoard: string;
  // 总访问量
  totalVisits: number;
  // 公安备案号
  publicSecurityRegistrationNumber: string;
  // 内容更新的时间
  contentUpdateTime: number;
  // 标签
  tags: { id: number; name: string }[];
  // 总文字数
  totalTextQuantity: number;
  // 创建时间
  createTime: number;
  // 数量
  count: { name: string; num: number }[];
  // 文本打印
  text: string[];
}

export const useGlobalStore = defineStore('global', {
  state: () => {
    return {
      isOpenDrawer: false,
      isCardLoading: false as boolean,
      webSite: {} as WebSite,
      isContract: false as boolean,
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
    getIsContract(state): boolean {
      return state.isContract;
    },
  },
  actions: {
    setIsOpenDrawer(newIsOpenDrawer: boolean) {
      this.isOpenDrawer = newIsOpenDrawer;
    },
    setIsCardLoading(newIsCardLoading: boolean) {
      this.isCardLoading = newIsCardLoading;
    },
    setWebSite(newWebSite: WebSite) {
      let tags: { id: number; name: string }[] = this.webSite.tags;
      this.webSite = newWebSite;
      this.webSite.tags = tags;
    },
    setWebSiteTags(newWebSiteTags: { id: number; name: string }[]) {
      this.webSite.tags = newWebSiteTags;
    },
    setIsContract(newIsContract: boolean) {
      this.isContract = newIsContract;
    },
  },
});
