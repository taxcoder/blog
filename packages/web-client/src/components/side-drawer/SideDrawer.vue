<template>
  <el-drawer
    :model-value="isDrawer"
    :append-to-body="true"
    size="75%"
    @close="close"
    direction="ltr"
    :show-close="false"
    :with-header="false"
  >
    <img :src="head" class="drawer-img" alt="bg" />
    <div class="drawer-user-info">
      <div class="drawer-user-info__header">
        <img :src="head" class="drawer-head-img" alt="head" />
        <p class="user-info__author">北极光</p>
        <p class="user-info__description">我们所过的每个平凡的日常也许就是连续发生的奇迹</p>
      </div>
      <div class="drawer-user-info__main">
        <p>
          <color-icon icon-class="icon-A_89" padding="0 5px 0 0" />
          北极光
          <strong>一天前</strong>
          在线
        </p>
        <p>
          <color-icon icon-class="icon-A_70" padding="0 5px 0 0" />
          累计撰写
          <strong>38</strong>
          篇文章
        </p>
        <p>
          <color-icon icon-class="icon-A_67" padding="0 5px 0 0" />
          累计添加
          <strong>138</strong>
          个标签
        </p>
        <p>
          <color-icon icon-class="icon-A_65" padding="0 5px 0 0" />
          累计收到
          <strong>115</strong>
          条评论
        </p>
      </div>
      <div class="drawer-user-info__menu">
        <el-collapse :accordion="true" v-model="activeCollapse">
          <el-collapse-item
            v-for="(item, index) in routerTabs(false)"
            :key="item.key"
            :name="index"
            @click="clickCollapse(item)"
          >
            <template v-slot:title>
              <color-icon :icon-class="item.iconName" padding="0 8px 0 0" :size="15" :top="-1" />
              <span :class="{ 'collapse-active': active === index }">{{ getTitleName(item, index) }}</span>
            </template>
            <p class="collapse-item-p" v-for="i in item.options" :key="i.key" @click="changeUrl(i)">{{ i.label }}</p>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import { computed, nextTick, ref } from 'vue';

import { useGlobalStore } from '@/stores/global';

import head from '@/assets/images/头像.jpeg';
import ColorIcon from '@/common/color-icon/ColorIcon.vue';
import { routerTabs } from '@/components/home-page/nav/index';

import { useRouter } from 'vue-router';

const router = useRouter();

const global = useGlobalStore();
const activeCollapse = ref<number>(0);
const active = ref<number>(-1);

const close = () => global.setIsOpenDrawer(false);

const clickCollapse = (item: any) => {
  active.value = activeCollapse.value.length === 0 ? 0 : activeCollapse.value;
  if (!item.url) return;
  if (router.currentRoute.value.path === item.url) return global.setIsOpenDrawer(false);
  router.push(item.url);
};

const changeUrl = (item: any) => {
  if (router.currentRoute.value.path !== item.url) router.push(item.url);
  global.setIsOpenDrawer(false);
};

const isDrawer = computed(() => global.getIsOpenDrawer);

const getTitleName = computed(() => (item: any, index) => {
  nextTick(() => {
    if (item.options.length !== 0) return;
    let collapse = document.getElementsByClassName('el-collapse-item')[index];
    collapse.getElementsByClassName('el-collapse-item__wrap')[0].innerHTML = '';
    collapse.getElementsByClassName('el-collapse-item__arrow')[0].innerHTML = '';
  });
  return item.name;
});
</script>

<style scoped>
img.drawer-img {
  height: 155px;
  width: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
}

.drawer-head-img {
  border-radius: 50%;
  width: 95px;
}

.drawer-user-info {
  height: 100%;
  width: 100%;
  position: relative;
  z-index: 9999;
  padding: 100px 15px 0 15px;
  font-family: round, sans-serif;
}

.drawer-user-info__header {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.user-info__author {
  margin: 14px 0 10px 0;
  font-size: 1.025rem;
}

.user-info__description {
  text-align: center;
  margin-bottom: 10px;
  font-size: 0.78rem;
  color: #606266;
  padding: 0 30px;
  line-height: 20px;
}

.drawer-user-info__main {
  flex-direction: column;
  display: flex;
  align-items: flex-start;
  margin-top: 5px;
}

.drawer-user-info__main p {
  color: #606266;
  padding-top: 7px;
  padding-bottom: 7px;
  font-size: 0.8rem;
  height: 15px;
  display: flex;
  align-items: center;
}

.drawer-user-info__main p strong {
  color: #73aaff;
  margin: 0 5px;
  font-weight: 500;
}

.drawer-user-info__menu {
  padding-top: 15px;
}

.drawer-user-info__menu .collapse-item-p {
  padding: 5px 35px;
}

.collapse-active {
  color: #73aaff;
}
</style>

<style>
.drawer-user-info__menu .el-collapse-item__header {
  height: 40px;
}

.drawer-user-info__menu .el-collapse,
.drawer-user-info__menu .el-collapse-item__header,
.drawer-user-info__menu .el-collapse-item__wrap {
  border: none !important;
}

.drawer-user-info__menu .el-collapse-item__content {
  padding-bottom: 0 !important;
}
</style>
