interface WebSite {
  id: string;
  name: string;
  headIcon: string;
  userName: string;
  motto: string;
  forTheRecord: string;
  bulletinBoard: string;
  totalVisits: number;
  publicSecurityRegistrationNumber: string;
  contentUpdateTime: number;
  tags: {
    id: number;
    name: string;
  }[];
  totalTextQuantity: number;
  createTime: number;
  count: {
    name: string;
    num: number;
  }[];
  text: string[];
}
export declare const useGlobalStore: import('pinia').StoreDefinition<
  'global',
  {
    isOpenDrawer: boolean;
    isCardLoading: boolean;
    webSite: WebSite;
    isContract: boolean;
  },
  {
    getIsOpenDrawer(
      state: {
        isOpenDrawer: boolean;
        isCardLoading: boolean;
        webSite: {
          id: string;
          name: string;
          headIcon: string;
          userName: string;
          motto: string;
          forTheRecord: string;
          bulletinBoard: string;
          totalVisits: number;
          publicSecurityRegistrationNumber: string;
          contentUpdateTime: number;
          tags: {
            id: number;
            name: string;
          }[];
          totalTextQuantity: number;
          createTime: number;
          count: {
            name: string;
            num: number;
          }[];
          text: string[];
        };
        isContract: boolean;
      } & import('pinia').PiniaCustomStateProperties<{
        isOpenDrawer: boolean;
        isCardLoading: boolean;
        webSite: WebSite;
        isContract: boolean;
      }>
    ): boolean;
    getIsCardLoading(
      state: {
        isOpenDrawer: boolean;
        isCardLoading: boolean;
        webSite: {
          id: string;
          name: string;
          headIcon: string;
          userName: string;
          motto: string;
          forTheRecord: string;
          bulletinBoard: string;
          totalVisits: number;
          publicSecurityRegistrationNumber: string;
          contentUpdateTime: number;
          tags: {
            id: number;
            name: string;
          }[];
          totalTextQuantity: number;
          createTime: number;
          count: {
            name: string;
            num: number;
          }[];
          text: string[];
        };
        isContract: boolean;
      } & import('pinia').PiniaCustomStateProperties<{
        isOpenDrawer: boolean;
        isCardLoading: boolean;
        webSite: WebSite;
        isContract: boolean;
      }>
    ): boolean;
    getWebSite(
      state: {
        isOpenDrawer: boolean;
        isCardLoading: boolean;
        webSite: {
          id: string;
          name: string;
          headIcon: string;
          userName: string;
          motto: string;
          forTheRecord: string;
          bulletinBoard: string;
          totalVisits: number;
          publicSecurityRegistrationNumber: string;
          contentUpdateTime: number;
          tags: {
            id: number;
            name: string;
          }[];
          totalTextQuantity: number;
          createTime: number;
          count: {
            name: string;
            num: number;
          }[];
          text: string[];
        };
        isContract: boolean;
      } & import('pinia').PiniaCustomStateProperties<{
        isOpenDrawer: boolean;
        isCardLoading: boolean;
        webSite: WebSite;
        isContract: boolean;
      }>
    ): WebSite;
    getIsContract(
      state: {
        isOpenDrawer: boolean;
        isCardLoading: boolean;
        webSite: {
          id: string;
          name: string;
          headIcon: string;
          userName: string;
          motto: string;
          forTheRecord: string;
          bulletinBoard: string;
          totalVisits: number;
          publicSecurityRegistrationNumber: string;
          contentUpdateTime: number;
          tags: {
            id: number;
            name: string;
          }[];
          totalTextQuantity: number;
          createTime: number;
          count: {
            name: string;
            num: number;
          }[];
          text: string[];
        };
        isContract: boolean;
      } & import('pinia').PiniaCustomStateProperties<{
        isOpenDrawer: boolean;
        isCardLoading: boolean;
        webSite: WebSite;
        isContract: boolean;
      }>
    ): boolean;
  },
  {
    setIsOpenDrawer(newIsOpenDrawer: boolean): void;
    setIsCardLoading(newIsCardLoading: boolean): void;
    setWebSite(newWebSite: WebSite): void;
    setWebSiteTags(
      newWebSiteTags: {
        id: number;
        name: string;
      }[]
    ): void;
    setIsContract(newIsContract: boolean): void;
  }
>;
export {};
