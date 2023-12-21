<!--
 * @Author: tanxiang 1571922819@qq.com
 * @Date: 2023-06-17 20:23:45
 * @Description:
 * @LastEditTime: 2023-12-03 18:55:18
 * @LastEditors: tanxiang 1571922819@qq.com
 * @FilePath: \blog\packages\web-client\src\components\user-info\UserIndex.vue
 * @copyright: Copyright (c) 2023 by 1571922819@qq.com, All Rights Reserved.
-->
<template>
  <div id="user-info" class="w-full h-full min-w-[var(--user-info)]" v-show="props.show">
    <div class="user-info-container h-full box-border pt-[15px]">
      <div v-if="props.showUserInfo && juiceIsDraw" class="w-full h-full p-0">
        <user-info />
        <web-site-board />
        <life-process />
        <web-site-info />
        <web-site-tag />
      </div>
      <div v-else-if="!props.showUserInfo && juiceIsDraw" class="w-full h-full p-0">
        <article-directory />
      </div>
      <div v-else></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();

const props = defineProps({
  show: { type: Boolean, required: true },
  showUserInfo: { type: Boolean, required: true },
});

const juiceIsDraw = computed(() => {
  return !route.meta || !route.meta.isDraw;
});
</script>

<style scoped>
#list .user-left .user-info-container {
  padding-right: 10px;
  padding-left: 30px;
}

#list .user-right .user-info-container {
  padding-right: 30px;
  padding-left: 10px;
}
</style>