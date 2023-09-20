<template>
  <div id="loading" :class="loadingClass">
    <div class="left-divider" />
    <div class="center-divider">
      <span class="divider-empty" v-if="isEmpty" v-text="'没有更多的数据'" />
      <span v-else><n-spin size="small" stroke="#5b5b5b" /></span>
    </div>
    <div class="right-divider" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, inject, watch } from 'vue';

import { useArticleStore } from '@/stores/article';

let minWidth = ref<number>(200);
let imgHeight: any = inject('imgHeight');
let screenWidth: any = inject('screenWidth');
let scrollStatus: any = inject('scrollStatus');
let scrollHeight: any = inject('scrollHeight');

const article = useArticleStore();

const emit = defineEmits(['queryNextData']);

const isEmpty = computed(() => {
  return Math.ceil(article.getArticleList.total / article.getPageSize) <= article.getCurrent;
});

const loadingClass = computed(() => ({
  active: isBottom.value,
}));

const isBottom = computed(() => {
  // console.log(scrollHeight.value, scrollStatus.current, imgHeight.value);
  return (
    screenWidth.value <= 600 &&
    scrollHeight.value !== -1 &&
    imgHeight.value.value !== -1 &&
    scrollHeight.value - (scrollStatus.current + imgHeight.value) <= minWidth.value
  );
});

watch(
  () => isBottom.value,
  (newBottom, oldBottom) => {
    /**
     * 1. 当改变前和改变后的结果是一样的，则表示已经改变了一次了
     * 2. 当 newBottom = false，表示当前距离底部要大于 200
     */
    if (newBottom === oldBottom || !newBottom) return;
    if (!isEmpty.value) emit('queryNextData');
  },
  { deep: true }
);
</script>

<style scoped>
#loading {
  height: 1px;
  padding: 20px 20px 0 20px;
  display: none;
}

#loading.active {
  display: flex;
}

.left-divider,
.right-divider {
  flex: 1;
}

.center-divider {
  padding: 0 15px;
  position: relative;
  top: -10px;
}

.divider-empty {
  position: relative;
  top: 5px;
}
</style>
