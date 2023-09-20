<template>
  <user-container :isDefer="true" :loading="loading" title="网站资讯" iconClass="icon-tongzhi" :size="33" :left="-6">
    <template v-slot:content>
      <p class="summary-info-data">文章数目 : {{ articleSize }}</p>
      <p class="summary-info-data">已运行时间 : {{ runTime }} 天</p>
      <p class="summary-info-data">本站总字数 : {{ allText }}</p>
      <p class="summary-info-data">本站总访问量 : {{ allVisit }}</p>
      <p class="summary-info-data">最后更新时间 : {{ lastUpdateTime }}前</p>
    </template>
  </user-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
//@ts-ignore
import { useDate } from '@tanxiang/utils/index.ts';
import { useGlobalStore } from '@/stores/global';

const global: any = useGlobalStore();
const { days, headway } = useDate();

const loading = ref<boolean>(false);

const runTime = computed(() => days(global.getWebSite.createTime));

const lastUpdateTime = computed(() => headway(global.getWebSite.contentUpdateTime, true));

const allVisit = computed(() =>
  global.getWebSite.totalVisits >= 10000 ? global.getWebSite.totalVisits / 10000 + ' w' : global.getWebSite.totalVisits
);

const articleSize = computed(() => {
  return global.getWebSite.count
    ? global.getWebSite.count.find((article: { name: string; num: number }) => article.name === '文章').num
    : 0;
});
const allText = computed(() =>
  global.getWebSite.totalTextQuantity >= 10000
    ? global.getWebSite.totalTextQuantity / 10000 + ' w'
    : global.getWebSite.totalTextQuantity
);
</script>

<style scoped>
.notice {
  width: 23px;
}

.summary-info-data:first-of-type {
  padding-top: 5px;
}

.summary-info-data {
  font-size: 0.9rem;
  line-height: 30px;
  font-family: 'round', sans-serif;
}
</style>
