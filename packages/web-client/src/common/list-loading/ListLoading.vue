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
import { computed, ref, inject } from 'vue';

const loading = ref<boolean>(false);

let minWidth = ref<number>(200);
let screenWidth: any = inject('screenWidth');
let scrollStatus: any = inject('scrollStatus');
let scrollHeight: any = inject('scrollHeight');
let imgHeight: any = inject('imgHeight');

const isEmpty = computed(() => loading.value);

const loadingClass = computed(() => ({
  active:
    screenWidth.value <= 600 &&
    scrollHeight.value !== -1 &&
    imgHeight.value !== -1 &&
    scrollHeight.value - (scrollStatus.current + imgHeight.value) <= minWidth.value,
}));
</script>

<style scoped>
#loading {
  height: 1px;
  padding: 0 20px;
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