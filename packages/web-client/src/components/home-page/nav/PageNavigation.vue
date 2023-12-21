<!--
 * @Author: tanxiang 1571922819@qq.com
 * @Date: 2023-06-15 10:07:04
 * @Description:
 * @LastEditTime: 2023-12-10 13:06:37
 * @LastEditors: tanxiang 1571922819@qq.com
 * @FilePath: \blog\packages\web-client\src\components\home-page\nav\PageNavigation.vue
 * @copyright: Copyright (c) 2023 by 1571922819@qq.com, All Rights Reserved.
-->
<template>
  <div
    id="page-nav"
    :class="getNavClass"
    class="flex fixed w-full z-1000 box-border min-w-[360px] translate-y-0 transition-transform"
  >
    <left-navigation :isActive="juiceIsActive" />
    <right-navigation />
  </div>
</template>

<script setup lang="ts">
import { minWidth } from '@/config/index';
import { computed, inject, ref, watch } from 'vue';

import { useGlobalStore } from '@/stores/global';
import { useRoute } from 'vue-router';

import LeftNavigation from '@/components/home-page/nav/LeftNavigation.vue';
import RightNavigation from '@/components/home-page/nav/RightNavigation.vue';

const route = useRoute();
const count = ref<number>(0);
const before = ref<number | null>(null);

const global = useGlobalStore();
const status: any = inject('status');

// 判断是否给导航栏增加样式
const juiceIsAddNavStyle = computed(() => {
  // 获取滚动条距离顶部的距离，需要去除一个默认视图窗口
  let show = juiceIsGreaterThan.value;
  // 如果当前没有滚动超过一个视口，则不隐藏
  if (show < 0) return false;
  // 如果超过视口，进行赋值，判断隐藏导航栏
  if (!before.value) {
    before.value = show;
    return show > 0;
  }
  // 如果之前的距离大于当前距离，则不隐藏，小于则隐藏
  let flag = before.value <= show;
  before.value = show;
  // 如果当前小于，但是已经没有在滚动了，直接隐藏
  return flag || !global.getIsContract;
});
// 判断是否大于视口
const juiceIsGreaterThan = computed(() => status.scroll - window.innerHeight);
// 判断是否需要激活
const juiceIsActive = computed(() => {
  if (status.scroll !== 0 && count.value === 0) count.value++;
  return status.scroll > 0;
});
// 判断是不是手机版
const juiceIsPhone = computed(() => status.width <= minWidth);
// 判断是否移除了激活
const juiceIsRemoveActive = computed(() => count.value > 0);

const getNavClass = computed(() => {
  return {
    'important-translate-y-[-70px]': juiceIsAddNavStyle.value,
    active: juiceIsActive.value,
    'pb-[10px] bg-[var(--current-color)] backdrop-blur-[50px]': juiceIsActive.value && juiceIsPhone.value,
    'pc-active': juiceIsActive.value && !juiceIsPhone.value,
    'remove-active': !juiceIsActive.value && juiceIsRemoveActive.value && !juiceIsPhone.value,
    'backdrop-opacity-none bg-white/0': !juiceIsActive.value && juiceIsRemoveActive.value && juiceIsPhone.value,
    'px-[40px] pt-[20px] pb-[10px]': !juiceIsRemoveActive.value && !juiceIsPhone.value,
    'drop-shadow-[0_1px_5px_rgba(204,204,204,1)] dark:drop-shadow-[0_1px_5px_rgba(0,0,0,1)]':
      juiceIsGreaterThan.value > 0 && !juiceIsAddNavStyle.value,
  };
});

watch(
  () => route.name,
  () => (count.value = 0),
  { immediate: true }
);
</script>

<style scoped>
#page-nav {
  &.pc-active {
    animation: useActive 0.3s linear forwards;
  }
  &.remove-active {
    animation: removeActive 0.3s linear forwards;
  }
}

.dark #page-nav {
  &.pc-active {
    animation: darkUseActive 0.3s linear forwards;
  }
  &.remove-active {
    animation: darkRemoveActive 0.3s linear forwards;
  }
}

@keyframes removeActive {
  100% {
    padding: 20px 40px 10px 40px;
    backdrop-filter: none;
    background-color: rgba(255, 255, 255, 0);
  }
  0% {
    padding: 0 0 10px 0;
    background-color: var(--current-color);
    backdrop-filter: blur(50px);
  }
}

@keyframes useActive {
  0% {
    padding: 20px 40px 10px 40px;
    backdrop-filter: none;
    background-color: rgba(255, 255, 255, 0);
  }
  100% {
    padding: 0 0 10px 0;
    background-color: var(--current-color);
    backdrop-filter: blur(50px);
  }
}

@keyframes darkRemoveActive {
  100% {
    padding: 20px 40px 10px 40px;
    backdrop-filter: none;
    background-color: rgba(255, 255, 255, 0);
  }
  0% {
    padding: 0 0 10px 0;
    background-color: var(--dark-current-color);
    backdrop-filter: blur(50px);
  }
}

@keyframes darkUseActive {
  0% {
    padding: 20px 40px 10px 40px;
    backdrop-filter: none;
    background-color: rgba(255, 255, 255, 0);
  }
  100% {
    padding: 0 0 10px 0;
    background-color: var(--dark-current-color);
    backdrop-filter: blur(50px);
  }
}
</style>
