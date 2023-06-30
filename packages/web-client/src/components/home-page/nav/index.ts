import type { NavigationOptions } from '@/types/navigation-options';

export const tabNames: string[] = ['首页', '生活', '文章'];
export const routerTabs: NavigationOptions[] | any = [
  {
    name: '首页',
    iconName: 'icon-home',
    options: [],
    url: '/list/article',
  },
  {
    name: '生活',
    iconName: 'icon-aircraft',
    options: [{ label: '随笔', key: '随笔', url: '/list/essay' }],
  },
  {
    name: '文章',
    iconName: 'icon-brush',
    options: [
      { label: '归档', key: '归档', url: '/list/archived' },
      { label: '分类', key: '分类', url: '/list/classification' },
    ],
  },
];