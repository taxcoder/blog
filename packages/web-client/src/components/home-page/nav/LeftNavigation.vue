<template>
  <n-tabs
    ref="tabsInstRef"
    v-model:value="tabName"
    :animated="true"
    :bar-width="80"
    class="common-nav-tabs"
    size="large"
    trigger="hover"
    type="line"
  >
    <template #prefix>
      <span class="title" v-text="global.getWebSite.name" @click="router.push('/list/article')" />
    </template>
    <n-tab
      v-if="isPhone"
      v-for="(item, index) in routerTabs()"
      :name="item.name"
      @mouseenter="mouse(index, 'enter')"
      @mouseleave="mouse(index, 'leave')"
    >
      <n-dropdown
        :keyboard="false"
        :options="item.options"
        :style="isEmptyOptions(item.options) ? dropdown : {}"
        class="custom-dropdown"
        placement="top"
        @mouseenter="mouse(index, 'enter')"
        @mouseleave="mouse(index, 'leave')"
        @select="select(index, $event)"
      >
        <div>
          <i :class="item.iconName" class="iconfont" />
          <span class="nav-options" @click="item['url'] ? changeRoute(item['url']) : void 0" v-text="item.name" />
          <i v-if="isEmptyOptions(item.options)" :class="{ hover: index === current }" class="iconfont icon-arrow-up" />
        </div>
      </n-dropdown>
    </n-tab>
  </n-tabs>
</template>

<script setup lang="ts">
import { nextTick, ref, computed, inject, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useBaseStore } from '@/stores/base';
import { useGlobalStore } from '@/stores/global';

import { routerTabs, tabNames } from './index';
import { minWidth } from '@/config';
import type { ItemOptions } from '@/types/navigation-options';

const router = useRouter();
const base = useBaseStore();
const global = useGlobalStore();

const current = ref(-1);
const timer = ref<undefined | number>(undefined);
const tabsInstRef = ref<any>(null);
const tabName = ref(tabNames[base.getCurrent]);
let dropdown = { maxWidth: '500px', width: '80px' };

const screenWidth: any = inject('screenWidth');

const mouse = (index: number, status: string) => {
  if (status === 'leave') {
    current.value = -1;
    timer.value = setTimeout(() => {
      tabName.value = tabNames[base.getCurrent];
      nextTick(() => tabsInstRef.value?.syncBarPosition());
    }, 100);
  } else {
    current.value = index;
    clearTimeout(timer.value);
  }
};

const select = (index: number, key: string) => {
  let path: string = routerTabs()[index].options.find((optionKey: ItemOptions) => optionKey.key === key).url;
  changeRoute(path);
  base.setCurrent(index);
};

const isEmptyOptions = (p: ItemOptions[]): Boolean => p.length !== 0;

const changeRoute = (path: string) => {
  // 如果不存在url或者是需要跳转的url和当前的路由一致，则取消
  if (!path && router.currentRoute.value.path === path) return;
  router.replace(path);
};

const isPhone = computed(() => screenWidth.value > minWidth);

watch(
  () => router.currentRoute.value,
  (newValue) => {
    if (newValue['path'] === '/list/article') base.setCurrent(0);
  },
  { immediate: true, deep: true }
);
</script>

<style scoped>
@import '@/components/home-page/index.css';

.title {
  cursor: pointer;
  color: white;
  margin-left: 20px;
  margin-right: 10px;
  font-size: 25px;
  transition: font-size 0.15s;
  font-family: var(--header-web-name-font-family);
}

@media screen and (max-width: 400px) {
  .title {
    font-size: 1.2rem;
  }
}

#page-nav.bgColor .title {
  color: white !important;
}

#page-nav.active .title {
  color: black;
}

.iconfont.hover {
  transform: rotateZ(180deg);
}
</style>
