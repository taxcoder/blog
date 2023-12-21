<!--
 * @Author: tanxiang 1571922819@qq.com
 * @Date: 2023-06-11 19:46:30
 * @Description:
 * @LastEditTime: 2023-12-04 21:45:06
 * @LastEditors: tanxiang 1571922819@qq.com
 * @FilePath: \blog\packages\web-client\src\common\search\BlogSearch.vue
 * @copyright: Copyright (c) 2023 by 1571922819@qq.com, All Rights Reserved.
-->
<template>
  <div v-show="juiceIsSearchHidden" id="blog-search" class="py-[20px] px-[20px]">
    <el-tabs v-model="active" @tab-click="conTabClick" :stretch="true">
      <el-tab-pane v-for="tab in tabs" :key="tab.key" :label="tab.label" :name="tab.name">
        <div class="min-h-[100px] overflow-auto dis-scroll" :class="[setSearchHeight]">
          <el-card
            class="search-card overflow-auto"
            shadow="never"
            v-for="value in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]"
            :key="value"
          >
            {{ value }}
          </el-card>
          <el-pagination
            hide-on-single-page
            :total="500"
            layout="prev, pager, next"
            class="mt-[5px] mb-[30px]"
            :pager-count="5"
            :default-page-size="20"
            v-model:current-page="page"
          />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { useGlobalStore } from '@/stores/global';
import { useSearch } from '@tanxiang/apis';

const global = useGlobalStore();
const active = ref<string>('article');
const search = useSearch();

const page = ref<number>(1);

const status = reactive<{ width: number; height: number }>({
  width: 0,
  height: 0,
});

const tabs = reactive<{ key: number; label: string; name: string }[]>([
  {
    key: 1,
    label: '文章',
    name: 'article',
  },
  {
    key: 2,
    label: '标签',
    name: 'tag',
  },
]);

onMounted(() => {
  window.addEventListener('resize', onResize);
  onResize();
});

const onResize = () => {
  status.width = window.innerWidth;
  status.height = window.innerHeight;
};

const conTabClick = (tabs: any) => {};

const getSearchData = (condition: string, value: string) => {
  // TODO: 查询后台数据，实现查询操作
  // search.tableSearch(condition, value, 1, 20);
};

const juiceIsSearchHidden = computed(() => {
  return global.getSearchInput && global.getSearchInput.length > 0;
});

const setSearchHeight = computed(() => {
  return status.width === 0 || status.width > 600 ? 'search-height' : 'search-height-all';
});

watch(
  () => global.getSearchInput,
  (newValue: string) => {
    if (newValue.length > 0) getSearchData(active.value, newValue);
  },
  { immediate: true }
);
</script>

<style scoped>
#blog-search {
  overflow: hidden;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

#blog-search::-webkit-scrollbar {
  display: none;
}

.search-card {
  border: none;
  padding: 0 15px;
}
</style>

<style>
.warp ~ .is-vertical > div {
  background-color: #828282;
  opacity: 0.5;
  width: 5px;
}

.search-message-box .el-message-box__content {
  height: calc(100% - 53px);
  padding-left: 0 !important;
  padding-right: 0 !important;
}

.search-message-box .el-message-box__content .el-message-box__container,
.search-message-box .el-message-box__content .el-message-box__container .el-message-box__message {
  height: 100%;
}
</style>
