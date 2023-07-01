<template>
  <user-container :isDefer="true" :loading="loading">
    <template v-slot:title>
      <img src="@/assets/images/notice.png" alt="通知" class="notice" />
      <span class="information">网站资讯</span>
    </template>
    <template v-slot:content>
      <p class="summary-info-data">文章数目 : 54</p>
      <p class="summary-info-data">已运行时间 : 365 天</p>
      <p class="summary-info-data">本站总字数 : 14.76 W</p>
      <p class="summary-info-data">本站总访问量 : 40215</p>
      <p class="summary-info-data">最后更新时间 : 16 分钟前</p>
    </template>
  </user-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const loading = ref<boolean>(false);
</script>

<style scoped>
.notice {
  width: 23px;
}

.information {
  font-size: 1.05rem;
  line-height: 30px;
  text-align: right;
  font-family: 'HarmonyOS', sans-serif;
  margin-right: 5px;
}

.summary-info-data:first-of-type {
  padding-top: 5px;
}

.summary-info-data {
  font-size: 0.9rem;
  line-height: 30px;
  font-family: 'HarmonyOS', sans-serif;
}
</style>