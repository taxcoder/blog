import { createRouter, createWebHistory, Router } from 'vue-router';
import { useBaseStore } from '@/stores/base';

const router: Router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/analysis',
    },
  ],
});

router.afterEach((to, from) => {
  const base: any = useBaseStore();
  if (to.path === '/refresh' || to.path === '/') return;
  base.pushClickRouterList({ name: to.name, url: to.path });
});

export default router;