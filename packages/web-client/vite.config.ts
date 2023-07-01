import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver, NaiveUiResolver } from 'unplugin-vue-components/resolvers';
// @ts-ignore
import ElementPlus from 'unplugin-element-plus/vite';

import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        {
          'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar'],
        },
      ],
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      dts: true,
      dirs: ['src/components', 'src/common'],
      resolvers: [ElementPlusResolver(), NaiveUiResolver()],
    }),
    ElementPlus({}),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});