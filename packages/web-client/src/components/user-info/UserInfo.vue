<template>
  <el-card class="user-info-item" shadow="never" body-style="padding: 0;position: relative">
    <!-- 图层 -->
    <div class="layer"></div>
    <div class="item-avatar">
      <!-- 图片 -->
      <div class="bg-img"></div>
      <el-avatar :size="110" shape="circle" fit="cover" :src="head" alt="头像" class="user-avatar" />
      <span class="status" />
    </div>
    <div class="web-site-author">北极光</div>
    <div class="web-site-info">我们所过的每个平凡的日常也许就是连续发生的奇迹</div>
    <div class="web-site-data">
      <el-row :gutter="20" class="content-row" :style="{ height: '100%', width: '100%' }">
        <el-col :span="24 / content.length" v-for="item in content">
          <div class="grid-content ep-bg-purple">
            <p v-text="item.count" class="content-count" />
            <p v-text="item.name" class="content-name" />
          </div>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

import head from '@/assets/images/头像.jpeg';

const content = reactive([
  {
    name: '文章',
    count: 111,
  },
  {
    name: '文章',
    count: 111,
  },
  {
    name: '文章',
    count: 111,
  },
]);
</script>

<style scoped>
.user-info-item {
  border-radius: 10px;
  box-shadow: var(--box-shaow);
}

.item-avatar {
  position: relative;
  width: 100%;
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 60px;
}

.bg-img {
  background: url('@/assets/images/bg-head.png') left;
  top: -3px;
}

.layer,
.bg-img {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
}

.layer {
  z-index: 8;
  background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255) 45%);
}

.user-avatar {
  border: 6px solid #fff;
  z-index: 9;
}

.status {
  width: 15px;
  height: 15px;
  background: #6bdf8f;
  border-radius: 50%;
  position: absolute;
  bottom: 18px;
  right: 88px;
  border: 5px solid #fff;
  z-index: 10;
}

.web-site-author {
  text-align: center;
  font-size: 1.6rem;
  padding-left: 20px;
  padding-right: 20px;
}

.web-site-info {
  font-size: 0.9rem;
  text-align: center;
  margin-top: 15px;
  padding: 0 45px !important;
  line-height: 20px;
  margin-bottom: 5px;
}

.web-site-data {
  height: 90px;
  padding-bottom: 10px;
  padding-left: 30px;
  padding-right: 30px;
}

.content-row {
  margin-left: 0 !important;
}

.web-site-data .grid-content {
  height: 100%;
  padding-top: 12px;
  text-align: center;
  font-size: 1.15rem;
  box-sizing: border-box;
}

.content-name {
  font-size: 0.9rem;
  text-align: center;
  font-family: HarmonyOS, sans-serif;
}

.web-site-author,
.web-site-info,
.web-site-data {
  position: relative;
  z-index: 9;
}

.content-count {
  font-size: 1.25rem;
  text-align: center;
  margin-bottom: 20px;
  font-family: 'HarmonyOS', sans-serif;
}
</style>