<template>
  <div class="article-card-content-item">
    <div class="article-title">
      <span class="article-top">置顶</span>
      <el-tooltip effect="dark" placement="top">
        <template #content>
          <p style="font-size: 1rem">一件部署SpringBoot到Mysql里面</p>
        </template>
        <span class="article-name">一件部署SpringBoot到Mysql里面</span>
      </el-tooltip>
    </div>
    <div class="article-status">
      <div class="create-time">
        <n-icon class="time-icon" size="15">
          <CalendarMonthOutlined />
        </n-icon>
        <span class="time">发表于 2023-05-16</span>
      </div>
      <div :style="updateTimeIsOpen" class="update-time">
        <n-icon class="time-icon" size="15">
          <UpdateTwotone />
        </n-icon>
        <span class="time">更新于 2023-05-16</span>
      </div>
      <div class="article-author">
        <n-icon class="time-icon" size="13">
          <PenNib />
        </n-icon>
        <span class="time">作者：aurora</span>
      </div>
    </div>
    <div class="article-content">
      <span>
        这个zblog主题具有简约的设计风格和完善的功能，它采用响应式自适应布局结构，免费提供多样化的自定义设置。主题的头部包含网站名称和导航栏，主体部分包括分类文章、最新列表和侧边栏，底部则是友情链接、版权信息和页面列表。尽管主题默认的整体结构比较简单，但通过丰富的自定义设置，用户可以根据需要进行多样化配置。
      </span>
    </div>
    <div class="article-type">
      <div class="article-type-tag">
        <span v-for="item in ['wordpress', '自定义函数', 'SpringIOC']" class="tag-name">
          <n-icon :size="15"><TagSharp /></n-icon>
          <el-link :underline="false" class="article-type-tag-name" v-text="item" />
        </span>
      </div>
      <div class="article-type-classification">
        <n-icon class="tag-icon" color="#409EFF" size="16">
          <Folder20Filled />
        </n-icon>
        <el-link :underline="false" class="article-type-classification-name">网站源码源码</el-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject } from 'vue';
import { useBaseStore } from '@/stores/base';

import { PenNib } from '@vicons/fa';
import { Folder20Filled } from '@vicons/fluent';
import { CalendarMonthOutlined, TagSharp, UpdateTwotone } from '@vicons/material';

const base = useBaseStore();

const screenWidth: any = inject('screenWidth');

const updateTimeIsOpen = computed(() => {
  let flag = screenWidth.value <= 950 && screenWidth.value > 600;
  return { display: flag || screenWidth.value <= 450 ? 'none' : 'inline-flex' };
});
</script>

<style scoped>
.article-card-content-item {
  display: inline-block;
  transition: width 0.3s;
  padding: 50px 20px;
  font-family: HarmonyOS, sans-serif;
  box-sizing: border-box;
  overflow: hidden;
}

.article-title {
  display: flex;
  align-items: center;
  height: 35px;
}

.article-top {
  background: -webkit-linear-gradient(0deg, #3ca5f6 0%, #a86af9 100%);
  color: white;
  padding: 7px 0;
  border-radius: 3px;
  margin-right: 5px;
  min-width: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.article-name {
  font-size: 1.075rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  line-height: 25px;
  cursor: pointer;
}

.article-status {
  height: 30px;
  display: flex;
  color: #818181;
  margin-top: 2px;
  align-items: center;
}

.create-time {
  padding-right: 8px;
  border-right: 1px solid #818181;
  height: 50%;
  display: inline-flex;
  align-items: center;
}

.update-time {
  padding-left: 8px;
  padding-right: 8px;
  border-right: 1px solid #818181;
  height: 50%;
  display: inline-flex;
  align-items: center;
}

.article-author {
  padding-left: 8px;
  height: 50%;
  display: inline-flex;
  align-items: center;
}

.time-icon {
  margin-right: 2px;
  position: relative;
  top: 0;
}

.time {
  font-size: 0.8rem;
}

.article-content {
  margin-top: 15px;
  font-size: 0.95rem;
  line-height: 25px;
  color: #595959;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 5;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}

.article-type {
  display: grid;
  grid-template-columns: 75% 25%;
  height: 30px;
  margin-top: 10px;
  color: #818181;
}

.article-type-tag,
.article-type-classification {
  height: 100%;
  display: flex;
  align-items: center;
}

.article-type-classification {
  justify-content: end;
}

.tag-name {
  display: flex;
  margin-right: 1px;
  align-items: center;
}

.article-type-tag-name:first-of-type {
  margin-left: 0;
}

.article-type-tag-name {
  margin: 0 2px;
  font-size: 0.75rem;
  position: relative;
  left: -1px;
}

.article-type-classification-name {
  font-size: 0.75rem;
}

@media screen and (max-width: 600px) {
  .article-card-content-item {
    padding: 10px 10px;
  }

  .article-status {
    margin-top: 0;
  }

  .article-content {
    margin-top: 5px;
    -webkit-line-clamp: 3;
    font-size: 0.85rem;
    line-height: 20px;
  }

  .article-type {
    display: none;
  }
}

@media screen and (min-width: 600px) and (max-width: 750px) {
  .article-card-content-item {
    width: 100%;
  }
}

@media screen and (max-width: 950px) {
  .article-type-tag {
    display: none;
  }

  .article-type {
    grid-template-columns: 100%;
  }
}
</style>