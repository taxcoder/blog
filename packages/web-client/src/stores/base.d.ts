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
export declare const useBaseStore: import("pinia").StoreDefinition<"base", {
    theme: boolean;
    current: number;
    openActive: boolean;
    openUserActive: boolean;
    isCardLoading: boolean;
    webSite: WebSite[];
}, {
    getTheme(state: {
        theme: boolean;
        current: number;
        openActive: boolean;
        openUserActive: boolean;
        isCardLoading: boolean;
        webSite: {
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
        }[];
    } & import("pinia").PiniaCustomStateProperties<{
        theme: boolean;
        current: number;
        openActive: boolean;
        openUserActive: boolean;
        isCardLoading: boolean;
        webSite: WebSite[];
    }>): boolean;
    getCurrent(state: {
        theme: boolean;
        current: number;
        openActive: boolean;
        openUserActive: boolean;
        isCardLoading: boolean;
        webSite: {
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
        }[];
    } & import("pinia").PiniaCustomStateProperties<{
        theme: boolean;
        current: number;
        openActive: boolean;
        openUserActive: boolean;
        isCardLoading: boolean;
        webSite: WebSite[];
    }>): number;
    getOpenActive(state: {
        theme: boolean;
        current: number;
        openActive: boolean;
        openUserActive: boolean;
        isCardLoading: boolean;
        webSite: {
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
        }[];
    } & import("pinia").PiniaCustomStateProperties<{
        theme: boolean;
        current: number;
        openActive: boolean;
        openUserActive: boolean;
        isCardLoading: boolean;
        webSite: WebSite[];
    }>): boolean;
    getOpenUserActive(state: {
        theme: boolean;
        current: number;
        openActive: boolean;
        openUserActive: boolean;
        isCardLoading: boolean;
        webSite: {
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
        }[];
    } & import("pinia").PiniaCustomStateProperties<{
        theme: boolean;
        current: number;
        openActive: boolean;
        openUserActive: boolean;
        isCardLoading: boolean;
        webSite: WebSite[];
    }>): boolean;
    getIsCardLoading(state: {
        theme: boolean;
        current: number;
        openActive: boolean;
        openUserActive: boolean;
        isCardLoading: boolean;
        webSite: {
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
        }[];
    } & import("pinia").PiniaCustomStateProperties<{
        theme: boolean;
        current: number;
        openActive: boolean;
        openUserActive: boolean;
        isCardLoading: boolean;
        webSite: WebSite[];
    }>): boolean;
    getWebSite(state: {
        theme: boolean;
        current: number;
        openActive: boolean;
        openUserActive: boolean;
        isCardLoading: boolean;
        webSite: {
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
        }[];
    } & import("pinia").PiniaCustomStateProperties<{
        theme: boolean;
        current: number;
        openActive: boolean;
        openUserActive: boolean;
        isCardLoading: boolean;
        webSite: WebSite[];
    }>): {
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
    }[];
}, {
    setTheme(newTheme: boolean): void;
    setCurrent(newCurrent: number): void;
    setOpenActive(newOpenActive: boolean): void;
    setOpenUserActive(newOpenUserActive: boolean): void;
    setIsCardLoading(newIsCardLoading: boolean): void;
    setWebSite(newWebSite: Array<WebSite>): void;
}>;
export {};
