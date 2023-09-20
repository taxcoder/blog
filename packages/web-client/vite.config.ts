import { defineConfig } from 'vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver, NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import ElementPlus from 'unplugin-element-plus/vite';

import viteCompression from 'vite-plugin-compression';
import vue from '@vitejs/plugin-vue';
//@ts-ignore
import { fileURLToPath } from 'url';

const config = defineConfig({
  plugins: [
    vue(),
    viteCompression({
      deleteOriginFile: false,
      algorithm: 'gzip',
      ext: '.gz',
    }),
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
  server: {
    port: 5137,
    open: true,
  },
});

export default config;