<template>
  <list-article
    @queryNextData="queryNextData"
    :articleList="articleList"
    :loading="loading"
    @sizeChange="sizeChange"
    :current="article.getCurrent"
    :page-size="article.getPageSize"
  />
</template>

<script lang="ts" setup>
import { inject, nextTick, onActivated, onBeforeMount, ref } from 'vue';

import { useRouter } from 'vue-router';
import { useArticle } from '@tanxiang/apis';
import { useBaseStore } from '@/stores/base';
import { useArticleStore } from '@/stores/article';
import ListArticle from '@/components/list-article/ListArticle.vue';

const list = useArticle();
const router = useRouter();
const base = useBaseStore();
const article = useArticleStore();

const articleList = ref<any>({});
const loading = ref<boolean>(true);

const isDataLoading: any = inject('isDataLoading');

/**
 * 在页面挂载之前，请求后台服务器，获取第一页的数据
 */
onBeforeMount(() => {
  list
    .articleList(article.getCurrent, article.getPageSize)
    .then((success: any) => {
      loading.value = false;
      article.setArticleList(success);
      articleList.value = article.getArticleList;
      nextTick(isDataLoading());
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
  list
    .articleList(article.getCurrent + 1, article.getPageSize)
    .then((result: any) => {
      if (result.data.records.length === 0) {
        article.setCurrent(Math.ceil(result.data.total / result.data.size));
      } else {
        article.setCurrent(result.data.current);
        let ret = article.getArticleList.records;
        result.data.records.forEach((s: any) => ret.push(s));
        result.data.records = ret;
        article.setArticleList(result.data);
        articleList.value = article.getArticleList;
      }
    })
    .catch(() => {});
};

/**
 * 切换每页显示个数
 * @param obj 包含当前页和每页条数的对象
 */
const sizeChange = (obj: { current: number; size: number }) => {
  list
    .articleList(obj.current, obj.size)
    .then((success: any) => {
      article.setPageSize(obj.size);
      article.setCurrent(obj.current);
      article.setArticleList(success);
      articleList.value = article.getArticleList;
      loading.value = false;
    })
    .catch(() => {});
};
</script>

<style scoped></style>