<template>
  <el-card class="user-info-item" shadow="never" body-style="padding: 0;position: relative">
    <div class="item">
      <div class="name">
        <svg aria-hidden="true" v-if="iconClass.length > 0" :style="iconStyle">
          <use :xlink:href="iconName" />
        </svg>
        <span class="title-name">{{ title }}</span>
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
      <div>
        <slot name="more"></slot>
      </div>
    </div>
  </el-card>
</template>
icon

<script setup lang="ts">
import { ElSkeleton, ElSkeletonItem, ElDivider, ElCard } from 'element-plus';

const props = defineProps({
  loading: { type: Boolean, default: true },
  isDefer: { type: Boolean, default: false },
  title: String,
  size: { type: Number, default: 20 },
  iconClass: { type: String, default: '' },
  left: { type: Number, default: 0 },
});

const iconName = computed(() => {
  return '#' + props.iconClass;
});

const iconStyle = computed(() => {
  return { width: props.size + 'px', height: '100%', position: 'relative', left: props.left + 'px' };
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
  padding: 5px 20px 15px 20px;
  box-sizing: border-box;
}

.item .name {
  height: 40px;
  display: grid;
  align-items: center;
  grid-template-columns: 10% 90%;
}

.item .item-content {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.title-name {
  font-size: 0.75rem;
  line-height: 30px;
  text-align: left;
  margin-left: 6px;
}
</style>
