<template>
  <div id="article-page">
    <div class="article-breadcrumb">
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item :to="{ path: '/' }">
          <i data-v-90bfc037="" class="icon-home iconfont"></i>
          <span>首页</span>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          {{ articleData?.title }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="article-item-content">
      <article-page-content :markdownContent="content" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue';

import { computed, ref, onMounted, provide, inject, defineAsyncComponent, nextTick } from 'vue';

import { useArticleStore } from '@/stores/article';
import { useRouter } from 'vue-router';
import { useArticle } from '@tanxiang/apis';
import { useBaseStore } from '@/stores/base';

const ArticlePageContent = defineAsyncComponent(() => import('@/views/article-page/ArticlePageContent.vue'));

const base: any = useBaseStore();
const article: any = useArticleStore();
const router: any = useRouter();
const articleApi: any = useArticle();
const isDataLoading: any = inject('isDataLoading');
const screenWidth: any = inject('screenWidth');

const articleData = ref<any>();
const content = ref<string>('');

provide('articleData', articleData);

onMounted(() => {
  queryInfo(article.getArticleList.records);
});

const queryInfo = (isArraysEmpty: boolean) => {
  if (!isArraysEmpty) queryArticleInfo();
  else if (selectArticleId.value) queryArticleUrl();
};

const queryArticleInfo = () => {
  articleApi
    .findArticleIdByInfo(router.currentRoute.value.params.id)
    .then((success: any) => {
      articleData.value = success;
      // 当请求完成之后，再显示下面的内容
      queryArticleUrl();
    })
    .catch((error: any) => {
      console.log(error);
    })
    .finally(() => {
      nextTick(() => isDataLoading());
    });
};

const queryArticleUrl = () => {
  // 只请求url
  articleApi
    .findArticleIdByUrl(router.currentRoute.value.params.id)
    .then((success: any) => {
      if (!articleData.value) articleData.value = selectArticleId.value;
      // 返回文章的个数
      content.value = success;
    })
    .catch((error: any) => {
      console.log(error);
    })
    .finally(() => {
      nextTick(() => isDataLoading());
    });
};

/**
 * 如果是从首页点击进入的，会传递文章数组，从数组内查询到当前文章信息
 */
const selectArticleId = computed(() => {
  return article.getArticleList.records.find((record: any) => record.id == router.currentRoute.value.params.id);
});
</script>

<style scoped>
#article-page {
  width: 100%;
  box-sizing: border-box;
  padding-top: 15px;
}

.article-item-content {
  margin-top: 15px;
  background-color: white;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.05);
}

.icon-home {
  font-size: 0.9rem;
  margin-right: 3px;
}

.article-breadcrumb {
  background-color: white;
  width: 100%;
  box-sizing: border-box;
  padding: 15px 20px;
  border-radius: 7px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.05);
}
</style>