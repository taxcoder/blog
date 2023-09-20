export declare const tabNames: string[];
export declare const routerTabs: (flag?: boolean) => (
  | {
      name: string;
      key: string;
      iconName: string;
      options: never[];
      url: string;
    }
  | {
      name: string;
      key: string;
      iconName: string;
      options: {
        label: string;
        key: string;
        url: string;
      }[];
      url?: undefined;
    }
)[];
