<template>
  <div class="article-card-content">
    <!-- 具体的内容 -->
    <card-content-item v-if="isShow()" :item="item" />
    <div class="article-img">
      <el-image :lazy="true" :style="style" fit="cover" :src="item['image']">
        <template #error>
          <div class="image-error">
            <el-icon>
              <Picture />
            </el-icon>
          </div>
        </template>
      </el-image>
    </div>
    <!-- 具体的内容 -->
    <card-content-item v-if="!isShow()" :item="item" />
  </div>
</template>

<script lang="ts" setup>
import { inject } from 'vue';

import { Picture } from '@element-plus/icons-vue';
import CardContentItem from './CardContentItem.vue';

const style = { width: '100%', height: '100%' };

const props = defineProps({
  change: Boolean,
  index: { type: Number, required: true },
  item: { type: Object, required: true },
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
  position: relative;
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
  position: relative;
}

@media all and (min-width: 601px) {
  .article-img::after {
    width: 150px;
    content: '';
    height: 100%;
    position: absolute;
    z-index: 100;
    transform: var(--el-transition-duration);
  }

  .article-list-card-item .article-img:nth-child(odd)::after {
    right: 0;
    background-image: linear-gradient(to right, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 1) 100%);
  }

  .article-list-card-item .article-img:nth-child(even)::after {
    left: 0;
    background-image: linear-gradient(to left, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 1) 100%);
  }
}

@media all and (max-width: 600px) {
  .article-img::after {
    content: '';
    position: absolute;
    z-index: 100;
    left: 0;
    width: 100%;
    height: 75px;
    bottom: -5px;
    background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 1) 80%) !important;
  }
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
