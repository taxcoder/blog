<template>
  <a-config-provider
    :locale="zhCN"
    :theme="{
      token: {
        fontFamily: 'sakura, sans-serif',
        borderRadius: 20,
        fontSize: 14,
      },
      components: {
        Tabs: {
          borderRadius: 5,
          borderRadiusLG: 8,
          fontSize: 13,
          padding: 12,
          colorFillAlter: '#ffffff',
          colorPrimary: '#ffffff',
          marginXS: 0,
        },
        Button: {
          borderRadius: 0,
          borderRadiusLG: 0,
          controlHeightLG: 50,
          paddingContentHorizontal: 10,
        },
        Table: {
          borderRadiusLG: 0,
        },
        Modal: {
          borderRadiusLG: 5,
          fontFamily: 'sakura, sans-serif',
        },
        Checkbox: {
          borderRadiusSM: 4,
        },
      },
    }"
  >
    <inlet />
  </a-config-provider>
</template>
<script setup lang="ts">
import Inlet from '@/components/Inlet.vue';
import { onMounted } from 'vue';
import { useBaseStore } from '@/stores/base';
import { Data } from '@/config';
import zhCN from 'ant-design-vue/es/locale/zh_CN';

const base: any = useBaseStore();

onMounted(() => {
  base.setBreakpoint(window.innerWidth <= Data.changeWidth);
});
</script>

<style scoped></style>