<template>
  <div v-show="getListShow" class="app-node">
    <el-config-provider :locale="locale">
      <n-scrollbar
        :key="route.name"
        ref="scrollBar"
        :style="{ height: '100%' }"
        @scroll="scroll"
        id="scroll-bar"
        trigger="none"
        :size="60"
      >
        <home-page :title="base.getTitle" />
        <!-- 专用于滚动 -->
        <div id="start" />
        <div v-show="show" class="content-active">
          <content-main :position="userInfoPosition" :show-user-info="showUserInfo" :isDraw="isDraw">
            <router-view />
          </content-main>
          <side-pendant />
          <side-drawer />
          <page-footer v-if="show" />
        </div>
      </n-scrollbar>
    </el-config-provider>
  </div>
  <div class="app-node page-loading" :class="{ 'loading-hidden': getListShow }">
    <global-loading />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useBaseStore } from '@/stores/base';
import { useGlobalStore } from '@/stores/global';
import { useArticleStore } from '@/stores/article';

import { useDark, useToggle } from '@vueuse/core';

import SideDrawer from '@/components/side-drawer/SideDrawer.vue';
import { init } from '@tanxiang/apis';
import PageFooter from '@/components/page-footer/PageFooter.vue';
import SidePendant from '@/components/side-pendant/SidePendant.vue';
import ContentMain from '@/components/ContentMain.vue';
import HomePage from '@/components/home-page/HomePage.vue';
import { pagingCount } from '@/config';
//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
//@ts-ignore
import en from 'element-plus/dist/locale/en.mjs';

import { NScrollbar } from 'naive-ui';
import GlobalLoading from '@/common/global-loading/GlobalLoading.vue';

const route = useRoute();
const base = useBaseStore();
const global = useGlobalStore();
const article = useArticleStore();

const scrollBar = ref();

const loadingTimer = ref<number | null>(null);
const currentTheme = ref<number>(-1);
const language = ref<string>('zh-cn');
const timer = ref<number | null>(null);
const scrollHeight = ref<number>(-1);
const imgHeight = ref<number>(-1);
const theme = ref<boolean>(false);

const screenWidth = ref<number>(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);
const screenHeight = ref<number>(
  window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
);

const scrollStatus = reactive({
  prev: 0,
  current: 0,
});

provide('scrollBar', scrollBar);
provide('imgHeight', imgHeight);
provide('screenWidth', screenWidth);
provide('screenHeight', screenHeight);
provide('scrollStatus', scrollStatus);
provide('scrollHeight', scrollHeight);
provide('isDataLoading', () => {
  if (loadingTimer.value) {
    clearTimeout(loadingTimer.value);
  }
  loadingTimer.value = setTimeout(() => base.setIsLoadingShow(true), 1000);
});

onMounted(() => {
  configInit();
  themeInit();
  addResize();
  webSiteInit();
});

const webSiteInit = () => {
  init()
    .then((success: any) => global.setWebSite(success))
    .catch((error: any) => {
      // 提示网站异常
      console.error(error);
    });
};

const themeInit = () => useToggle(useDark({ storageKey: 'theme', valueDark: 'dark', valueLight: 'light' }));

const configInit = () => {
  if (!pagingCount.includes(article.getPageSize)) article.setPageSize(pagingCount[0]);
};

const addResize = () => window.addEventListener('resize', resize, { passive: false });

// 每当窗口的大小发生变化时，获取到当前的宽度和高度，重新进行赋值
const resize = function (event: any) {
  screenWidth.value = event.currentTarget['innerWidth'];
  screenHeight.value = event.currentTarget['innerHeight'];
};

const scroll = (event: any) => {
  let flag = base.getTheme ? 1 : 0;
  // 第一次进来，将当前的主题保存
  if (currentTheme.value === -1) currentTheme.value = flag;
  else if (flag !== currentTheme.value) {
    // 如果后面进来了，主题不匹配，则表示是由于切换主题导致的滚动，直接取消执行
    currentTheme.value = flag;
    return;
  }

  if (timer.value) {
    clearTimeout(timer.value);
    global.setIsContract(true);
  }

  timer.value = setTimeout(() => {
    global.setIsContract(false);
  }, 650);

  scrollStatus.prev = scrollStatus.current;
  scrollStatus.current = event.target.scrollTop;
};

const locale = computed(() => (language.value === 'zh-cn' ? zhCn : en));

const show = computed(() => {
  return global.getWebSite.id && base.getIsLoadingShow;
});

const getListShow = computed(() => {
  return base.getIsLoadingShow;
});

const showUserInfo = computed(() => {
  return route.meta.showUserInfo;
});

const isDraw = computed(() => {
  return route.meta.isDraw;
});

const userInfoPosition = computed(() => (route.meta.position === undefined ? true : route.meta.position));

// 监听主题模式的变化
watch(
  () => base.getTheme,
  (newValue) => {
    localStorage.setItem('theme', newValue ? 'dark' : 'light');
    document.getElementsByTagName('html')[0].setAttribute('class', newValue ? 'dark' : 'light');
  },
  { deep: true, immediate: true }
);

watch(
  () => route.meta.name,
  (newValue: any) => {
    base.setTitle(newValue ? newValue : '');
  },
  { deep: true, immediate: true }
);

watch(
  () => route.name,
  () => {
    scrollStatus.current = scrollStatus.prev = 0;
  },
  { immediate: true }
);
</script>

<style scoped>
.app-node {
  width: 100%;
  height: 100%;
}

.app-node.page-loading {
  position: fixed;
  z-index: 9999;
  background-image: url('@/assets/images/bg.png');
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-hidden {
  animation: pageHidden 0.4s linear forwards;
}

.icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  overflow: hidden;
}

@keyframes pageHidden {
  0% {
    opacity: 1;
    z-index: 99999;
  }
  100% {
    opacity: 0;
    z-index: -1;
  }
}
</style>
