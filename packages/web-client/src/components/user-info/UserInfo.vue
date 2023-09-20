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
    <div class="web-site-author">{{ author }}</div>
    <div class="web-site-info">{{ motto }}</div>
    <div class="web-site-data">
      <el-row :gutter="20" class="content-row" :style="{ height: '100%', width: '100%' }">
        <el-col :span="24 / global.getWebSite.count.length" v-for="item in global.getWebSite.count">
          <div class="grid-content ep-bg-purple">
            <p v-text="item.num" class="content-count" />
            <p v-text="item.name" class="content-name" />
          </div>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { useGlobalStore } from '@/stores/global';

import head from '@/assets/images/头像.jpeg';

const global = useGlobalStore();

const author = computed(() => global.getWebSite.userName);
const motto = computed(() => global.getWebSite.motto);
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
  background: url('http://tx-blog.oss-cn-shenzhen.aliyuncs.com/profilePhoto/head-1691816160056.png') left;
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
  bottom: 15px;
  right: 100px;
  border: 5px solid #fff;
  z-index: 10;
}

.web-site-author {
  text-align: center;
  font-size: 1.4rem;
  padding-left: 20px;
  padding-right: 20px;
}

.web-site-info {
  font-size: 0.85rem;
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
  font-family: 'round', sans-serif;
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
  font-family: 'round', sans-serif;
}
</style>