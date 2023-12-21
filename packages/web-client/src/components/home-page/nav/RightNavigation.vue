<!--
 * @Author: tanxiang 1571922819@qq.com
 * @Date: 2023-06-12 22:23:51
 * @Description:
 * @LastEditTime: 2023-12-10 23:01:28
 * @LastEditors: tanxiang 1571922819@qq.com
 * @FilePath: \blog\packages\web-client\src\components\home-page\nav\RightNavigation.vue
 * @copyright: Copyright (c) 2023 by 1571922819@qq.com, All Rights Reserved.
-->
<template>
  <n-tabs type="bar" size="large" :bar-width="0" class="common-nav-tabs common-nav-tabs-right">
    <n-tab name="切换" class="tab-hidden">
      <n-switch
        :value="getPageTheme"
        class="relative bottom-0 mr-[10px]"
        :rail-style="getRailStyle"
        :on-update:value="onThemeUpdate"
      >
        <template #icon>
          <sun-fill v-if="!getPageTheme" class="icon-sunfill" />
          <i v-else class="iconfont icon-the-moon" />
        </template>
      </n-switch>
    </n-tab>
    <n-tab name="搜索">
      <i class="iconfont icon-search" @click="open()" />
    </n-tab>
    <n-tab name="菜单" v-if="juiceIsShow">
      <i class="iconfont icon-menu sm:text-[1.7rem] text-[1.55rem] transition-font-size" @click="setDrawer()" />
    </n-tab>
  </n-tabs>
</template>

<script setup lang="ts">
import { open } from '@/common/search/index';
import SunFill from '@/components/icon-svg/SunFill.vue';
import { minWidth } from '@/config/index';
import { useBaseStore } from '@/stores/base';
import { useGlobalStore } from '@/stores/global';
import { computed, inject } from 'vue';

const base: any = useBaseStore();
const global: any = useGlobalStore();

const status: any = inject('status');

const onThemeUpdate = (value: boolean) => base.setTheme(value);

const getRailStyle = function ({ checked }: { checked: boolean }) {
  return {
    background: checked ? 'rgb(106 106 106)' : '#ffffff',
    boxSizing: 'border-box',
    border: '1px solid #ccc',
    position: 'relative',
    boxShadow: 'none',
  };
};

const setDrawer = () => global.setIsOpenDrawer(true);
const juiceIsShow = computed(() => status.width <= minWidth);
const getPageTheme = computed((): boolean => base.getTheme);
</script>

<style scoped>
@import '@/components/home-page/index.css';
</style>

<style>
.common-nav-tabs-right .n-tabs-tab-wrapper {
  min-width: auto !important;
}
</style>