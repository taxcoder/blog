<template>
  <el-button type="primary" class="side-button" tag="div" @click="changeTheme">
    <template v-slot:icon>
      <n-icon size="22">
        <DarkTheme20Filled />
      </n-icon>
    </template>
  </el-button>
</template>

<script setup lang="ts">
import { DarkTheme20Filled } from '@vicons/fluent';

import { useBaseStore } from '@/stores/base';

const base = useBaseStore();

const changeTheme = () => base.setTheme(!base.getTheme);
</script>

<style scoped></style>
