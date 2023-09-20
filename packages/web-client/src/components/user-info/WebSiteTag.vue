<template>
  <user-container :isDefer="true" :loading="isLoading" title="文章标签" iconClass="icon-tags" :size="20">
    <template #content>
      <div id="tag-cloud"></div>
    </template>
    <template #more>
      <span class="more" @click="toTag('all')">{{ '查看更多...' }}</span>
    </template>
  </user-container>
</template>

<script setup lang="ts">
import TagCloud from 'TagCloud';
import { nextTick, onMounted, computed } from 'vue';
import { useTag } from '@tanxiang/apis';
import { useGlobalStore } from '@/stores/global';
import UserContainer from '@/components/user-info/UserContainer.vue';

import { useRouter } from 'vue-router';

const router = useRouter();
const global = useGlobalStore();
const tag = useTag();

const cloud: any = {
  radius: 325, // 滚动半径, 单位px
  maxSpeed: 'fast', // 滚动最大速度, 取值: slow, normal(默认), fast
  initSpeed: 'fast', // 滚动初速度, 取值: slow, normal(默认), fast
  direction: 135, // 初始滚动方向, 取值角度(顺时针deg): 0 对应 top, 90 对应 left, 135 对应 right-bottom(默认)...
  keep: true, // 鼠标移出组件后是否继续随鼠标滚动, 取值: false, true(默认) 对应 减速至初速度滚动, 随鼠标滚动
  itemClass: 'tag-cloud-item',
};

onMounted(() => {
  tag.tags().then((success: any) => {
    global.setWebSiteTags(success);
    createTagCloud();
  });
});

const isLoading = computed(() => !global.getWebSite.tags);

const random = () => Math.floor((70 + Math.random()) * (Math.random() * 2.4));

const createTagCloud = () => {
  nextTick(() => {
    let length = global.getWebSite.tags.length;
    cloud.radius = length < 50 ? 150 : length >= 100 ? 350 : length * 3.5;
    // tag cloud 3D
    let tc: any = document.getElementById('tag-cloud');
    let tagCloud = TagCloud(tc, stripping(global.getWebSite.tags), cloud);
    let item: any = document.getElementsByClassName('tag-cloud-item');
    for (let i = 0; i < item.length; i++) {
      item[i].style.color = 'rgb(' + random() + ',' + random() + ',' + random() + ')';
      item[i].addEventListener('mouseover', (e: any) => {
        let item: any = document.getElementsByClassName('tag-cloud-item');
        for (let i = 0; i < item.length; i++) item[i].style.opacity = 0;
        e.target.style.opacity = 1;
        tagCloud.pause();
      });
      item[i].addEventListener('mouseout', () => {
        let item: any = document.getElementsByClassName('tag-cloud-item');
        for (let i = 0; i < item.length; i++) item[i].style.opacity = 1;
        tagCloud.resume();
      });
      item[i].addEventListener('click', (e: any) => toTag(e.target.innerText));
    }
  });
};

const stripping = (tags: any) => {
  return tags.map((tag: { id: number; name: string }) => tag.name);
};

const toTag = (tag: string) => {
  if (tag === 'all') router.push('/list/tag');
  else router.push(`/list/tag/${global.getWebSite.tags.filter((t) => t.name === tag)[0].id}`);
};
</script>

<style scoped>
.tag-item {
  margin-top: 7px !important;
  margin-right: 7px !important;
  padding: 8px;
}

.more {
  width: 100%;
  display: flex;
  height: 25px;
  align-items: end;
  font-size: 0.82rem;
  color: #337ecc;
  cursor: pointer;
}

#tag-cloud {
  height: 300px;
}
</style>

<style>
#tag-cloud > .tagcloud {
  width: 100% !important;
  height: 100% !important;
}

.tag-cloud-item {
  cursor: pointer;
}
</style>

<style>
.tag-cloud-item {
  transition: opacity 0.3s linear;
}
</style>