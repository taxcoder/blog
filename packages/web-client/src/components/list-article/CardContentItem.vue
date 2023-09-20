<template>
  <div class="article-card-content-item">
    <div class="article-title">
      <span class="article-top" v-if="item['top']">置顶</span>
      <el-tooltip effect="dark" placement="top">
        <template #content>
          <p style="font-size: 1rem">{{ item['title'] }}</p>
          s
        </template>
        <span class="article-name">{{ item['title'] }}</span>
      </el-tooltip>
    </div>
    <div class="article-status">
      <div class="create-time">
        <color-icon iconClass="icon-A_89" :size="13" />
        <span class="time">发表于 {{ dateUtil.shortTime(item['createTime']) }}</span>
      </div>
      <div :style="updateTimeIsOpen" class="update-time">
        <n-icon class="time-icon" size="15">
          <UpdateTwotone />
        </n-icon>
        <span class="time">更新于 {{ dateUtil.shortTime(item['updateTime']) }}</span>
      </div>
      <div class="article-author">
        <n-icon class="time-icon" size="13">
          <PenNib />
        </n-icon>
        <span class="time">作者：{{ item['author'] }}</span>
      </div>
    </div>
    <div class="article-content">
      <span>
        {{ item['prefixContent'] }}
      </span>
    </div>
    <div class="article-type">
      <div class="article-type-tag">
        <span v-for="i in isAdditional(item['tag'])" class="tag-name">
          <n-icon :size="15"><TagSharp /></n-icon>
          <el-link :underline="false" class="article-type-tag-name" v-text="i.name" :href="`/list/tag/${i.id}`" />
        </span>
      </div>
      <div class="article-type-classification">
        <n-icon class="tag-icon" color="#409EFF" size="16">
          <Folder20Filled />
        </n-icon>
        <el-link
          :underline="false"
          class="article-type-classification-name"
          v-text="item['classification'].name"
          :href="`/list/classification/${item['classification'].id}`"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject } from 'vue';
import { useBaseStore } from '@/stores/base';
import { useDate } from '../../../../../utils';

import { PenNib } from '@vicons/fa';
import { Folder20Filled } from '@vicons/fluent';
import { CalendarMonthOutlined, TagSharp, UpdateTwotone } from '@vicons/material';

const base = useBaseStore();
const dateUtil = useDate();

const screenWidth: any = inject('screenWidth');

const props = defineProps({
  item: { type: Object, required: true },
});

const updateTimeIsOpen = computed(() => {
  let flag = screenWidth.value <= 950 && screenWidth.value > 600;
  return { display: flag || screenWidth.value <= 450 ? 'none' : 'inline-flex' };
});

const isAdditional = computed(() => (tag: any) => {
  return tag.length > 3 ? tag.filter((t, index) => index <= 2) : tag;
});
</script>

<style scoped>
.article-card-content-item {
  display: inline-block;
  transition: width 0.3s;
  padding: 50px 20px;
  font-family: round, sans-serif;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
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
}

.article-status {
  height: 30px;
  display: flex;
  color: #818181;
  margin-top: 2px;
  align-items: center;
}

.article-status .create-time {
  padding-right: 8px;
  border-right: 1px solid #818181;
  height: 50%;
  display: inline-flex;
  align-items: center;
}

.article-status .update-time {
  padding-left: 8px;
  padding-right: 8px;
  border-right: 1px solid #818181;
  height: 50%;
  display: inline-flex;
  align-items: center;
}

.article-status .article-author {
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

.article-status .time {
  font-size: 0.75rem;
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
  grid-template-columns: 80% 20%;
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