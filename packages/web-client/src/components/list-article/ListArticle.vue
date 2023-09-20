<template>
  <div :style="leftCardStyle" class="card">
    <el-card
      @click="openArticleList(item.id)"
      v-for="(item, index) in articleList.records"
      :body-style="bodyStyle"
      :embedded="true"
      class="article-list-card-item"
      shadow="hover"
    >
      <el-skeleton :animated="true" :loading="props.loading" :rows="6">
        <template #template>
          <el-skeleton :animated="true" :rows="change ? 10 : 8" />
        </template>
        <template #default>
          <card-content :change="change" :index="index" :item="item" />
        </template>
      </el-skeleton>
    </el-card>
    <format-paging
      :layout="layout"
      :total="props.total"
      :pageSizes="pagingCount"
      :pager-count="isPcAndPhone ? 9 : 5"
      :current="props.current === -1 ? article.getCurrent : props.current"
      :pageSize="props.pageSize === -1 ? article.getPageSize : props.pageSize"
      @sizeChange="sizeChange"
      @currentChange="currentChange"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, inject, watch } from 'vue';

import { changeWidth, minWidth, pagingCount } from '@/config/index';
import CardContent from '@/components/list-article/CardContent.vue';
import FormatPaging from '@/components/format-paging/FormatPaging.vue';
import { useRouter, useRoute } from 'vue-router';
import { useArticleStore } from '@/stores/article';
import { useBaseStore } from '@/stores/base';

const route = useRoute();
const router = useRouter();
const article = useArticleStore();
const base = useBaseStore();

const screenWidth: any = inject('screenWidth');

const emit = defineEmits(['queryNextData', 'sizeChange']);

const props = defineProps({
  articleList: {
    type: Object,
    default: () => {},
  },
  loading: {
    type: Boolean,
    required: true,
  },
  pageSize: {
    type: Number,
    default: -1,
  },
  current: {
    type: Number,
    default: -1,
  },
  total: {
    type: Number,
    default: -1,
  },
  layout: {
    type: String,
    default: 'total, prev, pager, next, jumper, sizes',
  },
});
// 点击文章列表时，跳转路由
const openArticleList = (id: any) => router.push('/articles/' + id);

const queryNextData = () => {
  emit('queryNextData');
};

const bodyStyle: any = computed(() => {
  return {
    width: '100%',
    boxSizing: 'border-box',
    padding: props.loading ? 'var(--el-card-padding)' : '0',
  };
});

const change = computed(() => screenWidth.value <= minWidth);

/**
 * 切换当前页
 * @param obj 包含当前页和每页条数的对象
 */
const currentChange = (obj: { current: number; size: number }) => sizeChange(obj);

const sizeChange = (obj: { current: number; size: number }) => emit('sizeChange', obj);

const isPcAndPhone = computed(() => screenWidth.value > changeWidth);

const leftCardStyle = computed(() => {
  return {
    width: !base.getOpenActive ? '100%' : '',
    marginBottom: !isPcAndPhone.value ? 0 : '20px',
    paddingLeft: route.meta.isDraw || !base.getOpenActive ? 0 : !route.meta.position ? '15px' : '30px',
    paddingRight: route.meta.isDraw || !base.getOpenActive ? 0 : route.meta.position ? '15px' : '30px',
  };
});

/**
 * 当窗口或者是数组数数组内容发生变化时，重新获取高度，传递给父组件
 */
watch(
  () => isPcAndPhone.value,
  (newValue: boolean, oldValue: boolean) => {
    // 相等则表示没有触发页面变化
    if (newValue === oldValue) return;
    /**
     * newValue > changeWidth = true
     * 1. 当页面小于等于指定宽度时，将当前页转换成第一页
     * 2. 当页面大于指定宽度时，根据存储的当前页请求数据
     */
    sizeChange({
      current: !newValue ? 1 : props.current,
      size: props.pageSize,
    });
  }
);
</script>

<style scoped>
.article-list-card-item {
  margin-bottom: 20px;
  border-radius: 10px;
}

.card {
  cursor: pointer;
  padding-top: 15px;
  box-sizing: border-box;
}

@media screen and (max-width: 1200px) {
  .card {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
}
</style>
