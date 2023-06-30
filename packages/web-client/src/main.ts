import 'element-plus/theme-chalk/dark/css-vars.css';
import 'element-plus/es/components/message/style/css';

import '@/assets/font/fonts.css';
import '@/assets/font/iconfont/iconfont.css';

import '@/styles/index.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import 'default-passive-events';

import App from './App.vue';
import router from './router';
// @ts-ignore
import vueTyped from 'vue3typed';

const app = createApp(App);
const pinia = createPinia();

pinia.use(piniaPluginPersistedstate);
app.use(pinia);
app.use(router);
app.use(vueTyped);

app.mount('#app');
