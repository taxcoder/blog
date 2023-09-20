export const tabNames = ['首页', '生活', '文章'];
export const routerTabs = (flag = true) => {
  return [
    {
      name: '首页',
      key: 'home',
      iconName: flag ? 'icon-home' : 'icon-home1',
      options: [],
      url: '/list/article',
    },
    {
      name: '生活',
      key: 'life',
      iconName: flag ? 'icon-aircraft' : 'icon-A_69',
      options: [{ label: '随笔', key: '随笔', url: '/list/essay' }],
    },
    {
      name: '文章',
      key: 'article',
      iconName: flag ? 'icon-brush' : 'icon-A_3',
      options: [
        { label: '归档', key: '', url: '/list/archived' },
        { label: '标签', key: '标签', url: '/list/tag' },
      ],
    },
  ];
};
