<template>
  <n-tabs type="bar" size="large" :bar-width="0" class="common-nav-tabs">
    <n-tab name="切换" class="tab-hidden">
      <n-switch :value="base.getTheme" class="theme-switch" :rail-style="railStyle" :on-update:value="themeUpdate">
        <template #icon>
          <img src="@/assets/icons/sunrise.png" alt="sun" class="img-sun" v-if="!base.getTheme" />
          <i class="iconfont icon-the-moon" v-else />
        </template>
      </n-switch>
    </n-tab>
    <n-tab name="搜索" class="tab-hidden">
      <i class="iconfont icon-search" @click="open()" />
    </n-tab>
    <n-tab name="菜单" v-if="isShow">
      <n-icon size="28" class="menu" @click="changeDrawer()">
        <Menu2 />
      </n-icon>
    </n-tab>
  </n-tabs>
</template>

<script setup lang="ts">
import { inject, computed } from 'vue';
import { Menu2 } from '@vicons/tabler';
import { open } from '@/common/search';
import { useBaseStore } from '@/stores/base';
import { useGlobalStore } from '@/stores/global';

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
  return screenWidth.value <= 1200;
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