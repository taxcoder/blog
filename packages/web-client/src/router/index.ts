import { createRouter, createWebHistory } from 'vue-router';

import ArticleList from '@/views/article-list/ArticleList.vue';

const ClassificationList = () => import('@/views/classification-list/ClassificationList.vue');
const ArchivedList = () => import('@/views/archived-list/ArchivedList.vue');
const EssayList = () => import('@/views/essay-list/EssayList.vue');

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
        name: '首页',
      },
    },
    {
      name: 'ArchivedList',
      path: '/list/archived',
      component: ArchivedList,
      meta: {
        name: '归档',
      },
    },
    {
      name: 'ClassificationList',
      path: '/list/classification',
      component: ClassificationList,
      meta: {
        name: '分类',
      },
    },
    {
      name: 'EssayList',
      path: '/list/essay',
      component: EssayList,
      meta: {
        name: '随笔',
      },
    },
  ],
});

export default router;