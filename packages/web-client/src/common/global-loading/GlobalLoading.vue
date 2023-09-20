<template>
  <div class="loading">
    <el-avatar :size="120" shape="circle" fit="cover" :src="head" alt="头像" class="user-avatar loading-avatar" />
    <span class="loading-status" />
  </div>
</template>

<script setup lang="ts">
import head from '@/assets/images/头像.jpeg';
</script>

<style scoped>
.loading {
  position: relative;
  top: -50px;
}

.loading-status {
  width: 15px;
  height: 15px;
  background: #6bdf8f;
  border-radius: 50%;
  position: absolute;
  bottom: 0;
  left: 80px;
  border: 4px solid #fff;
  z-index: 10;
}
</style>

<style>
.loading-avatar {
  border: 5px solid #fff;
  animation: twinkle 0.6s infinite alternate;
}

@keyframes twinkle {
  0% {
    opacity: 0.95;
  }
  100% {
    opacity: 0.4;
  }
}
</style>
