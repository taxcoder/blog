export declare const useArticleStore: import('pinia').StoreDefinition<
  'article',
  {
    articleList: any;
    pageSize: any;
    current: number;
    directory: any[];
  },
  {
    getArticleList(
      state: {
        articleList: any;
        pageSize: any;
        current: number;
        directory: any[];
      } & import('pinia').PiniaCustomStateProperties<{
        articleList: any;
        pageSize: any;
        current: number;
        directory: any[];
      }>
    ): any;
    getPageSize(
      state: {
        articleList: any;
        pageSize: any;
        current: number;
        directory: any[];
      } & import('pinia').PiniaCustomStateProperties<{
        articleList: any;
        pageSize: any;
        current: number;
        directory: any[];
      }>
    ): any;
    getCurrent(
      state: {
        articleList: any;
        pageSize: any;
        current: number;
        directory: any[];
      } & import('pinia').PiniaCustomStateProperties<{
        articleList: any;
        pageSize: any;
        current: number;
        directory: any[];
      }>
    ): number;
    getDirectory(
      state: {
        articleList: any;
        pageSize: any;
        current: number;
        directory: any[];
      } & import('pinia').PiniaCustomStateProperties<{
        articleList: any;
        pageSize: any;
        current: number;
        directory: any[];
      }>
    ): any[];
  },
  {
    setArticleList(newArticleList: any): void;
    setPageSize(newPageSize: number): void;
    setCurrent(newCurrent: number): void;
    setDirectory(newDirectory: any[]): void;
  }
>;
