<template>
  <el-drawer :model-value="isDrawer" :append-to-body="true" size="75%" :show-close="true" @close="close"></el-drawer>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { useGlobalStore } from '@/stores/global';

const global = useGlobalStore();

const close = () => {
  global.setIsOpenDrawer(false);
};

const isDrawer = computed(() => global.getIsOpenDrawer);
</script>

<style scoped></style>