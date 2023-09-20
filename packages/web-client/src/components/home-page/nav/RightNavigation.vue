<template>
  <n-tabs type="bar" size="large" :bar-width="0" class="common-nav-tabs">
    <n-tab name="切换" class="tab-hidden">
      <n-switch :value="base.getTheme" class="theme-switch" :rail-style="railStyle" :on-update:value="themeUpdate">
        <template #icon>
          <img :src="sunFill" class="icon-sunfill" v-show="!base.getTheme" />
          <i class="iconfont icon-the-moon" v-show="base.getTheme" />
        </template>
      </n-switch>
    </n-tab>
    <n-tab name="搜索" class="tab-hidden">
      <i class="iconfont icon-search" @click="open()" />
    </n-tab>
    <n-tab name="菜单" v-if="isShow">
      <i class="iconfont icon-menu" @click="changeDrawer()" />
    </n-tab>
  </n-tabs>
</template>

<script setup lang="ts">
import sunFill from '@/assets/images/sun-fill.png';
import { inject, computed } from 'vue';
import { open } from '@/common/search';
import { useBaseStore } from '@/stores/base';
import { useGlobalStore } from '@/stores/global';
import { minWidth } from '@/config/index';

const base: any = useBaseStore();
const global: any = useGlobalStore();

const screenWidth: any = inject('screenWidth');

const themeUpdate = (value: boolean) => base.setTheme(value);

const railStyle = function ({ checked }: { checked: boolean }) {
  return {
    background: checked ? 'rgb(106 106 106)' : '#ffffff',
    boxSizing: 'border-box',
    border: '1px solid #ccc',
    position: 'relative',
    boxShadow: 'none',
  };
};

const changeDrawer = () => {
  global.setIsOpenDrawer(true);
};

const isShow = computed(() => {
  return screenWidth.value <= minWidth;
});
</script>

<style scoped>
@import '@/components/home-page/index.css';

.theme-switch {
  position: relative;
  bottom: 0;
  margin-right: 10px;
}

.theme-switch .theme {
  width: 12px;
}
</style>
