<template>
  <el-card class="user-info-item" shadow="never" body-style="padding: 0;position: relative">
    <div class="item">
      <div class="name">
        <slot name="title" />
      </div>
      <el-divider />
      <div class="item-content">
        <el-skeleton :loading="loading && isDefer" animated>
          <template #template>
            <el-skeleton-item variant="text" style="width: 100%; height: 15px; margin: 10px 0 4px 0" />
            <el-skeleton-item variant="text" style="width: 100%; height: 15px; margin: 4px 0" />
            <el-skeleton-item variant="text" style="width: 100%; height: 15px; margin: 4px 0" />
            <el-skeleton-item variant="text" style="width: 100%; height: 15px; margin: 4px 0" />
            <el-skeleton-item variant="text" style="width: 100%; height: 15px; margin: 4px 0" />
            <el-skeleton-item variant="text" style="width: 100%; height: 15px; margin: 4px 0 3px 0" />
          </template>
          <template #default>
            <slot name="content" />
          </template>
        </el-skeleton>
      </div>
    </div>
  </el-card>
</template>
icon

<script setup lang="ts">
defineProps({
  loading: { type: Boolean, default: true },
  isDefer: { type: Boolean, default: false },
});
</script>

<style scoped>
.user-info-item {
  border-radius: 10px;
  margin-top: 5px;
  box-shadow: var(--box-shaow);
}

.item {
  width: 100%;
  height: 100%;
  padding: 15px 20px;
  box-sizing: border-box;
}

.item .name {
  display: grid;
  align-items: center;
  grid-template-columns: 10% 90%;
}

.item .item-content {
  width: 100%;
}
</style>