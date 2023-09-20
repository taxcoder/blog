export declare const useBaseStore: import('pinia').StoreDefinition<
  'base',
  {
    theme: boolean;
    current: number;
    openActive: boolean;
    openUserActive: boolean;
    title: string;
  },
  {
    getTheme(
      state: {
        theme: boolean;
        current: number;
        openActive: boolean;
        openUserActive: boolean;
        title: string;
      } & import('pinia').PiniaCustomStateProperties<{
        theme: boolean;
        current: number;
        openActive: boolean;
        openUserActive: boolean;
        title: string;
      }>
    ): boolean;
    getCurrent(
      state: {
        theme: boolean;
        current: number;
        openActive: boolean;
        openUserActive: boolean;
        title: string;
      } & import('pinia').PiniaCustomStateProperties<{
        theme: boolean;
        current: number;
        openActive: boolean;
        openUserActive: boolean;
        title: string;
      }>
    ): number;
    getOpenActive(
      state: {
        theme: boolean;
        current: number;
        openActive: boolean;
        openUserActive: boolean;
        title: string;
      } & import('pinia').PiniaCustomStateProperties<{
        theme: boolean;
        current: number;
        openActive: boolean;
        openUserActive: boolean;
        title: string;
      }>
    ): boolean;
    getOpenUserActive(
      state: {
        theme: boolean;
        current: number;
        openActive: boolean;
        openUserActive: boolean;
        title: string;
      } & import('pinia').PiniaCustomStateProperties<{
        theme: boolean;
        current: number;
        openActive: boolean;
        openUserActive: boolean;
        title: string;
      }>
    ): boolean;
    getTitle(
      state: {
        theme: boolean;
        current: number;
        openActive: boolean;
        openUserActive: boolean;
        title: string;
      } & import('pinia').PiniaCustomStateProperties<{
        theme: boolean;
        current: number;
        openActive: boolean;
        openUserActive: boolean;
        title: string;
      }>
    ): string;
  },
  {
    setTheme(newTheme: boolean): void;
    setCurrent(newCurrent: number): void;
    setOpenActive(newOpenActive: boolean): void;
    setOpenUserActive(newOpenUserActive: boolean): void;
    setTitle(newTitle: string): void;
  }
>;
