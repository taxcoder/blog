import '@/config/icons';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import 'default-passive-events';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import '@/config/markdown';
import App from './App.vue';
import router from './router';
// @ts-ignore
import vueTyped from 'vue3typed';
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
const app = createApp(App);
app.use(router);
app.use(pinia);
app.use(vueTyped);
app.mount('#app');
