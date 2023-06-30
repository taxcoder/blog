<template>
  <div class="article-card-content">
    <!-- 具体的内容 -->
    <card-content-item v-if="isShow()" />
    <div class="article-img">
      <el-image :lazy="true" :style="style" fit="cover" src="https://api.vvhan.com/api/acgimg">
        <template #error>
          <div class="image-error">
            <el-icon><Picture /></el-icon>
          </div>
        </template>
      </el-image>
    </div>
    <!-- 具体的内容 -->
    <card-content-item v-if="!isShow()" />
  </div>
</template>

<script lang="ts" setup>
import { Picture } from '@element-plus/icons-vue';
import CardContentItem from './CardContentItem.vue';

const style = { width: '100%', height: '100%' };

const props = defineProps({
  change: Boolean,
  index: { type: Number, required: true },
});

const isShow = () => {
  return props.change ? !props.change : props.index % 2 !== 0;
};
</script>

<style scoped>
.article-card-content {
  height: 330px;
  transition: all 0.3s;
  overflow: hidden;
  display: grid;
}

.article-list-card-item:nth-child(odd) .article-card-content {
  grid-template-columns: 52.5% 47.5%;
}

.article-list-card-item:nth-child(even) .article-card-content {
  grid-template-columns: 47.5% 52.5%;
}

.article-img {
  height: 100%;
  overflow: hidden;
}

.article-img > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: width 0.3s;
}

.image-error {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: var(--el-text-color-secondary);
  background: var(--el-fill-color-light);
}

@media screen and (min-width: 600px) and (max-width: 750px) {
  .article-card-content {
    grid-template-columns: 50% 50% !important;
  }
}

@media screen and (max-width: 600px) {
  .article-card-content {
    height: 398px;
    grid-template-columns: 100% !important;
    grid-template-rows: 59% 41%;
  }
}
</style>