import { createRouter, createWebHistory } from 'vue-router';
import { routeName } from '@/enum';
import ArticleList from '@/views/article-list/ArticleList.vue';
const ClassificationArticle = () => import('@/views/classification-article/ClassificationArticle.vue');
const TagList = () => import('@/views/tag-list/TagList.vue');
const TagArticle = () => import('@/views/tag-article/TagArticle.vue');
const ArchivedList = () => import('@/views/archived-list/ArchivedList.vue');
const EssayList = () => import('@/views/essay-list/EssayList.vue');
const ArticlePage = () => import('@/views/article-page/ArticlePage.vue');
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'home',
      path: '/',
      redirect: '/list/article',
    },
    {
      name: 'ArticleList',
      path: '/list/article',
      component: ArticleList,
      meta: {
        name: routeName.home,
        position: false,
        showUserInfo: true,
        isDraw: false,
      },
    },
    {
      name: 'ArchivedList',
      path: '/list/archived',
      component: ArchivedList,
      meta: {
        name: '归档',
        position: true,
        showUserInfo: true,
        isDraw: false,
      },
    },
    {
      name: 'TagList',
      path: '/list/tag',
      component: TagList,
      meta: {
        name: '标签',
        position: true,
        showUserInfo: false,
        isDraw: true,
      },
    },
    {
      name: 'TagArticle',
      path: '/list/tag/:id',
      component: TagArticle,
      meta: {
        name: '',
        position: true,
        showUserInfo: true,
        isDraw: false,
      },
    },
    {
      name: 'classificationArticle',
      path: '/list/classification/:id',
      component: ClassificationArticle,
      meta: {
        name: '',
        position: true,
        showUserInfo: true,
        isDraw: false,
      },
    },
    {
      name: 'EssayList',
      path: '/list/essay',
      component: EssayList,
      meta: {
        name: '随笔',
        position: true,
        showUserInfo: false,
        isDraw: true,
      },
    },
    {
      name: 'ArticlePage',
      path: '/articles/:id',
      component: ArticlePage,
      meta: {
        name: routeName.article,
        position: true,
        showUserInfo: false,
        isDraw: false,
      },
    },
  ],
});
export default router;
