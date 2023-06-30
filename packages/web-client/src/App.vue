<template>
  <sakura />
  <n-scrollbar ref="scrollBar" :style="{ height: '100%' }" @scroll="scroll">
    <home-page :title="route.meta['name']" />
    <!-- 专用于滚动 -->
    <div id="start" />
    <content-main :position="true" :height="mainHeight" @userHeight="userHeight">
      <router-view @height="height" />
    </content-main>
    <side-pendant />
    <page-footer />
  </n-scrollbar>
</template>

<script setup>
import { onMounted, provide, reactive, ref, watch } from 'vue';

import Sakura from '@/common/sakura/Sakura.vue';
import ContentMain from '@/components/ContentMain.vue';
import HomePage from '@/components/home-page/HomePage.vue';

import { useRoute } from 'vue-router';
import { useBaseStore } from '@/stores/base';
import { useDark, useToggle } from '@vueuse/core';
import PageFooter from '@/components/page-footer/PageFooter.vue';
import SidePendant from '@/components/side-pendant/SidePendant.vue';

const route = useRoute();
const base = useBaseStore();

const scrollBar = ref();

const mainHeight = ref('0');
const uHeight = ref('0');
const theme = ref(false);
const screenWidth = ref(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);
const screenHeight = ref(window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight);

const scrollStatus = reactive({
  prev: 0,
  current: 0,
});

provide('scrollBar', scrollBar);
provide('screenWidth', screenWidth);
provide('screenHeight', screenHeight);
provide('scrollStatus', scrollStatus);

onMounted(() => {
  useToggle(useDark({ storageKey: 'theme', valueDark: 'dark', valueLight: 'light' }));
  window.addEventListener('resize', resize, { passive: false });
});
// 每当窗口的大小发生变化时，获取到当前的宽度和高度，重新进行赋值
const resize = function (event) {
  screenWidth.value = event.currentTarget['innerWidth'];
  screenHeight.value = event.currentTarget['innerHeight'];
};

const scroll = (event) => {
  scrollStatus.prev = scrollStatus.current;
  scrollStatus.current = event.target.scrollTop;
};
// 先执行，直接将user模块的高度获取到，赋值给height
const userHeight = (h) => {
  mainHeight.value = h === 0 ? '0' : h + 'px';
  uHeight.value = h === 0 ? '0' : h + 'px';
};
// 后执行，判断动态内容的高度是否大于user模块，大于则赋值给height
const height = (h) => {
  return (mainHeight.value = uHeight.value < h ? h : uHeight.value);
};
// 监听主题模式的变化
watch(
  () => base.getTheme,
  (newValue) => {
    localStorage.setItem('theme', newValue ? 'dark' : 'light');
    document.getElementsByTagName('html')[0].setAttribute('class', newValue ? 'dark' : 'light');
  },
  { deep: true, immediate: true }
);
</script>

<style scoped></style>