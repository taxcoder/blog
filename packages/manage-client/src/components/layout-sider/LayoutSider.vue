<template>
  <layout-sider-phone v-if="base.getBreakpoint && !base.getFullScreen" />
  <layout-sider-pc v-show="!base.getBreakpoint && !base.getFullScreen" />
</template>

<script setup lang="ts">
import { useBaseStore } from '@/stores/base';

const base: any = useBaseStore();
</script>

<style scoped></style>