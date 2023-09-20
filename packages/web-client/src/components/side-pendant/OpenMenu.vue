<template>
  <el-button type="primary" class="side-button" tag="div" @click="isMenuItemActive()">
    <template v-slot:icon>
      <n-icon size="18" class="setting-button">
        <SettingsSharp />
      </n-icon>
    </template>
  </el-button>
</template>

<script setup lang="ts">
import { inject } from 'vue';

import { SettingsSharp } from '@vicons/ionicons5';

const isMenuItem = inject('isMenuItemActive');

const isMenuItemActive = () => isMenuItem();
</script>

<style scoped>
.setting-button {
  animation: turn 1.5s linear infinite forwards;
}

@keyframes turn {
  0% {
    transform: rotateZ(0);
  }
  100% {
    transform: rotateZ(360deg);
  }
}
</style>
