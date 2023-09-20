import '@/config/icons';
import { initRouter } from '@/config/routerMenu';
import { createApp } from 'vue';
import { createPinia } from 'pinia';

import 'default-passive-events';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import Antd from 'ant-design-vue';

import App from './App.vue';
import router from './router';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);

initRouter(router);

app.use(pinia);
app.use(router);
app.use(Antd);

app.mount('#app');