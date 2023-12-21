/*
 * @Author: tanxiang 1571922819@qq.com
 * @Date: 2023-09-10 21:15:30
 * @Description:
 * @LastEditTime: 2023-12-01 21:53:33
 * @LastEditors: tanxiang 1571922819@qq.com
 * @FilePath: \blog\packages\manage-client\src\main.ts
 * @copyright: Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import 'uno.css';
import '@/config/icons';
import '@/styles/uno.css';

import { initRouter } from '@/config/routerMenu';
import { createPinia } from 'pinia';
import { createApp } from 'vue';

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import Antd, { message } from 'ant-design-vue';

import App from './App.vue';
import router from './router';

import '@/config/markdown';
import 'echarts';
import ECharts from 'vue-echarts';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);

initRouter(router);

app.use(pinia);
app.use(router);
app.use(Antd);

app.component('v-chart', ECharts);

message.config({
  maxCount: 1,
});

app.mount('#app');