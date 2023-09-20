<template>
  <el-button type="primary" class="side-button" tag="div" @click="returnHome()">
    <template v-slot:icon>
      <el-icon size="20"><HomeFilled /></el-icon>
    </template>
  </el-button>
</template>

<script setup lang="ts">
import { inject } from 'vue';

import { HomeFilled } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const isMenuItem = inject('isMenuItemActive');

const isMenuItemActive = () => isMenuItem();

const returnHome = () => {
  router.replace('/');
};
</script>

<style scoped></style>
