<template>
  <div :style="leftCardStyle" class="article-list-card">
    <el-card
      v-for="(value, index) in articleList"
      :body-style="bodyStyle"
      :embedded="true"
      class="article-list-card-item"
      shadow="hover"
    >
      <el-skeleton :animated="true" :loading="loading" :rows="6">
        <template #template>
          <el-skeleton :animated="true" :rows="change ? 10 : 8" />
        </template>
        <template #default>
          {{ value }}
          <card-content :change="change" :index="index" />
        </template>
      </el-skeleton>
    </el-card>
    <div v-if="isPcAndPhone" id="page">
      <el-pagination
        v-if="isSmallWidth"
        v-model:current-page="currentPage"
        :total="total"
        :pager-count="pagerCount"
        :background="background"
        :hide-on-single-page="true"
        layout="prev, pager, next"
      />
      <el-pagination
        v-else
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :total="total"
        :pager-count="pagerCount"
        :page-sizes="pageSizes"
        :background="background"
        :hide-on-single-page="true"
        layout="total, prev, pager, next, jumper, sizes"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject, ref, onMounted, reactive } from 'vue';

import { minWidth } from '@/config';
import { useBaseStore } from '@/stores/base';
import CardContent from './CardContent.vue';

const base = useBaseStore();

const height = ref<number>(0);
const loading = ref<boolean>(true);

const pageSizes = [5, 10];
const total = ref<number>(370);
const pageSize = ref<number>(5);
const pagerCount = ref<number>(9);

const currentPage = ref<number>(1);
const background = ref<string>('#ccc');

const articleList = reactive([1, 2, 3, 4, 5, 6]);

const screenWidth: any = inject('screenWidth');
const emit = defineEmits(['height']);

onMounted(() => {
  sendHeight();
  addEventListener('resize', () => sendHeight());
});

// 小于860的宽度，将多余的功能清除
const isSmallWidth = computed(() => screenWidth.value <= 860);
// 小于600的宽度，直接算移动端
const isPcAndPhone = computed(() => screenWidth.value > 600);

const sendHeight = () => {
  // 所有的文章列表
  let item = document.getElementsByClassName('article-list-card-item');
  // 文章列表的总长度
  let articleLength: number = (item[0].clientHeight + 20) * item.length;
  // 分页组件
  let page = document.getElementById('page');
  let height = !page ? '100%' : Math.ceil(page.clientHeight + articleLength) + 'px';
  emit('height', height);
};

const leftCardStyle = computed(() => {
  return { width: !base.getOpenActive ? '100%' : '', marginBottom: screenWidth <= 600 ? 0 : '20px' };
});

const bodyStyle: any = computed(() => {
  return {
    width: '100%',
    boxSizing: 'border-box',
    padding: loading.value ? 'var(--el-card-padding)' : '0',
  };
});

const change = computed(() => screenWidth.value <= minWidth);
</script>

<style scoped>
.article-list-card {
  width: 100%;
  box-sizing: border-box;
  transition: all 0.3s linear;
}

#list.user-left > .article-list-card {
  position: absolute;
  right: 0;
  width: calc(100% - var(--user-info));
}

.article-list-card-item {
  margin-bottom: 20px;
  border-radius: 10px;
}

#page {
  position: relative;
  bottom: -20px;
}

@media screen and (max-width: 1200px) {
  .article-list-card {
    width: 100%;
    padding: 0 15px 15px 15px;
  }
}
</style>