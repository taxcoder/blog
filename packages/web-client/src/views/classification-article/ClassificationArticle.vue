<template>
  <list-article
    @queryNextData="queryNextData"
    :articleList="articleList"
    :loading="loading"
    @sizeChange="sizeChange"
    :page-size="size"
    :total="articleList.total"
    :current="current"
    layout="total, prev, pager, next, jumper"
  />
</template>

<script setup lang="ts">
import { ref, inject, onMounted, nextTick, onActivated } from 'vue';

import ListArticle from '@/components/list-article/ListArticle.vue';
import { useClassification } from '@tanxiang/apis';
import { useArticleStore } from '@/stores/article';
import { useBaseStore } from '@/stores/base';

import { useRoute, useRouter } from 'vue-router';

const classification: any = useClassification();
const route: any = useRoute();
const router: any = useRouter();
const base: any = useBaseStore();
const article: any = useArticleStore();

const current = ref<number>(1);
const size = ref<number>(6);
const articleList = ref<any>({});
const loading = ref<boolean>(true);

const screenWidth: any = inject('screenWidth');
const isDataLoading: any = inject('isDataLoading');

/**
 * 在页面挂载之前，请求后台服务器，获取第一页的数据
 */
onMounted(() => {
  if (!(!isNaN(parseFloat(route.params.id)) && isFinite(route.params.id))) return router.push('/');
  classification
    .classificationArticle(current.value, size.value, route.params.id)
    .then((success: any) => {
      if (success.total === 0) return router.push('/');
      loading.value = false;
      articleList.value = success;
      nextTick(isDataLoading());
      base.setTitle(success.records[0].classification.name);
    })
    .catch(() => {})
    .finally(() => {
      nextTick(() => isDataLoading());
    });
});

/**
 * 当窗口为移动端的页面时，请求数据调用此函数
 * 1. 如果获取的数组个数为0，则表示已经全部获取完了
 * 2. 如果仍获取到数据，则将新获取的数据存放到数组内
 */
const queryNextData = () => {
  classification
    .classificationArticle(current.value + 1, size.value, route.params.id)
    .then((result: any) => {
      if (result.data.records.length === 0) {
        current.value = Math.ceil(result.data.total / result.data.size);
      } else {
        current.value = result.data.current;
        result.data.records.forEach((s: any) => articleList.value.records.push(s));
      }
    })
    .catch(() => {});
};

/**
 * 切换每页显示个数
 * @param obj 包含当前页和每页条数的对象
 */
const sizeChange = (obj: { current: number; size: number }) => {
  classification
    .classificationArticle(obj.current, obj.size, route.params.id)
    .then((success: any) => {
      size.value = obj.size;
      current.value = obj.current;
      articleList.value = success;
      loading.value = false;
    })
    .catch(() => {});
};
</script>

<style scoped></style>