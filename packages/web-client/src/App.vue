<template>
  <sakura />
  <n-scrollbar ref="scrollBar" :style="{ height: '100%' }" @scroll="scroll" id="scroll-bar">
    <home-page :title="route.meta['name']" />
    <!-- 专用于滚动 -->
    <div id="start" />
    <content-main :position="true" :height="mainHeight" @userHeight="userHeight">
      <router-view @height="height" />
    </content-main>
    <side-pendant />
    <list-loading />
    <side-drawer />
    <page-footer />
  </n-scrollbar>
</template>

<script setup lang="ts">
import { onMounted, provide, reactive, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useBaseStore } from '@/stores/base';

import { useDark, useToggle } from '@vueuse/core';

import SideDrawer from '@/components/side-drawer/SideDrawer.vue';
import ListLoading from '@/common/list-loading/ListLoading.vue';

const route = useRoute();
const base = useBaseStore();

const scrollBar = ref();

const scrollHeight = ref<number>(-1);
const imgHeight = ref<number>(-1);
const uHeight = ref<string>('0');
const theme = ref<boolean>(false);
const mainHeight = ref<string>('0');

const screenWidth = ref<number>(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);
const screenHeight = ref<number>(
  window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
);

const scrollStatus = reactive({
  prev: 0,
  current: 0,
});

provide('scrollBar', scrollBar);
provide('screenWidth', screenWidth);
provide('screenHeight', screenHeight);
provide('scrollStatus', scrollStatus);
provide('scrollHeight', scrollHeight);
provide('imgHeight', imgHeight);

onMounted(() => {
  updateHeight();
  useToggle(useDark({ storageKey: 'theme', valueDark: 'dark', valueLight: 'light' }));
  window.addEventListener('resize', resize, { passive: false });
});

const updateHeight = () => {
  let bar = setInterval(() => {
    let content = document.getElementsByClassName('n-scrollbar-content')[0];
    let page = document.getElementById('home-page');
    if (content && page) {
      scrollHeight.value = content.scrollHeight;
      imgHeight.value = page.clientHeight;
      clearInterval(bar);
    }
  }, 100);
};

// 每当窗口的大小发生变化时，获取到当前的宽度和高度，重新进行赋值
const resize = function (event: any) {
  screenWidth.value = event.currentTarget['innerWidth'];
  screenHeight.value = event.currentTarget['innerHeight'];
};

const scroll = (event: any) => {
  scrollStatus.prev = scrollStatus.current;
  scrollStatus.current = event.target.scrollTop;
};

// 先执行，直接将user模块的高度获取到，赋值给height
const userHeight = (h: number) => {
  mainHeight.value = h === 0 ? '0' : h + 'px';
  uHeight.value = h === 0 ? '0' : h + 'px';
};

// 后执行，判断动态内容的高度是否大于user模块，大于则赋值给height
const height = (h: string) => {
  mainHeight.value = uHeight.value < h ? h : uHeight.value;
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