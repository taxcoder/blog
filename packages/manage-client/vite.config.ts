import { defineConfig } from 'vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';

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
      imports: ['vue', 'vue-router'],
    }),
    Components({
      dts: true,
      dirs: ['src/components', 'src/common'],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5138,
  },
});

export default config;