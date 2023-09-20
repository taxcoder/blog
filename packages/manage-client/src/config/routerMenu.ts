import { ItemType } from 'ant-design-vue';
import { h, reactive } from 'vue';
import {
  BulbOutlined,
  CoffeeOutlined,
  DatabaseOutlined,
  EditOutlined,
  FolderOutlined,
  HomeOutlined,
  ProfileOutlined,
  ReadOutlined,
  SettingOutlined,
  TagsOutlined,
} from '@ant-design/icons-vue';

const Analysis = () => import('@/views/analysis/Analysis.vue');
const ArticleEdit = () => import('@/views/article-edit/ArticleEdit.vue');
const EssayEdit = () => import('@/views/essay-edit/EssayEdit.vue');
const ListTag = () => import('@/views/list-tag/ListTag.vue');
const ListClassification = () => import('@/views/list-classification/ListClassification.vue');
const ListEssay = () => import('@/views/list-essay/ListEssay.vue');
const ListArticle = () => import('@/views/list-article/ListArticle.vue');
const Refresh = () => import('@/views/refresh/Refresh.vue');

export enum routerName {
  home = '洞若观火',
  editor = '奇思妙想',
  editorEssay = '直写胸臆',
  editorArticle = '文思泉涌',
  list = '分门别类',
  listTags = '标签列表',
  listClassifications = '分类列表',
  listEssays = '随笔列表',
  listArticles = '文章列表',
  base = '网站管理',
  refresh = '刷新',
}

export const routerMenu: ItemType[] = reactive([
  {
    label: routerName.home,
    key: 'analysis',
    icon: () => h(HomeOutlined, { style: { fontSize: '16px' } }),
    url: '/analysis',
    component: Analysis,
    children: [],
  },
  {
    label: routerName.editor,
    key: 'editor',
    icon: () => h(EditOutlined, { style: { fontSize: '16px' } }),
    url: '/editor',
    children: [
      {
        label: routerName.editorEssay,
        key: 'essay',
        icon: () => h(CoffeeOutlined, { style: { fontSize: '16px' } }),
        url: '/essay',
        component: EssayEdit,
        children: [],
      },
      {
        label: routerName.editorArticle,
        key: 'article',
        icon: () => h(BulbOutlined, { style: { fontSize: '16px' } }),
        url: '/article',
        component: ArticleEdit,
        children: [],
      },
    ],
  },
  {
    label: routerName.list,
    key: 'list',
    icon: () => h(DatabaseOutlined, { style: { fontSize: '16px' } }),
    url: '/list',
    children: [
      {
        label: routerName.listTags,
        key: 'tags',
        icon: () => h(TagsOutlined, { style: { fontSize: '16px' } }),
        url: '/tags',
        component: ListTag,
        children: [],
      },
      {
        label: routerName.listClassifications,
        key: 'classifications',
        icon: () => h(FolderOutlined, { style: { fontSize: '16px' } }),
        url: '/classifications',
        component: ListClassification,
        children: [],
      },
      {
        label: routerName.listArticles,
        key: 'articles',
        icon: () => h(ReadOutlined, { style: { fontSize: '16px' } }),
        url: '/articles',
        component: ListArticle,
        children: [],
      },
      {
        label: routerName.listEssays,
        key: 'essays',
        icon: () => h(ProfileOutlined, { style: { fontSize: '16px' } }),
        url: '/essays',
        component: ListEssay,
        children: [],
      },
    ],
  },
  {
    label: routerName.base,
    key: 'base',
    icon: () => () => h(SettingOutlined, { style: { fontSize: '16px' } }),
    url: '/base',
    children: [],
  },
  {
    label: routerName.refresh,
    key: 'refresh',
    icon: () => () => h(SettingOutlined, { style: { fontSize: '16px' } }),
    url: '/refresh',
    children: [],
    component: Refresh,
  },
]);

export const initRouter = (router: Router) => {
  routerMenu.forEach((menu: ItemType) => {
    let route: any = routeParam(menu);
    if (menu.children.length !== 0) {
      menu.children.forEach((child: ItemType, index: number) => {
        route.children[index] = routeParam(child);
        route.children[index].path = menu.url + child.url;
      });
    }

    router.addRoute(route);
  });
};

const routeParam = (menu: ItemType) => {
  return {
    name: menu.label,
    path: menu.url,
    component: menu.component,
    meta: {
      key: menu.key,
    },
    children: [],
  };
};