<template>
  <div class="header-left">
    <menu-unfold-outlined v-if="base.getOpen" class="trigger" @click="trigger()" />
    <menu-fold-outlined v-else class="trigger" @click="trigger()" />
    <a-breadcrumb :style="breadcrumb" separator=">" class="header-breadcrumb">
      <a-breadcrumb-item @click="jump" href="" style="cursor: pointer">
        <home-outlined />
        <span>洞若观火</span>
      </a-breadcrumb-item>
      <a-breadcrumb-item v-for="item in routes">
        <span>{{ item.name }}</span>
      </a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue';

import { HomeOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';

import { routerName } from '@/config/routerMenu';
import { useBaseStore } from '@/stores/base';

const router = useRouter();
const base: any = useBaseStore();

const breadcrumb = reactive({
  display: 'inline-block',
  userSelect: 'none',
});

const jump = () => router.push('/');

const trigger = () => base.setOpen(!base.getOpen);

const routes = computed(() => {
  let matched = router.currentRoute.value.matched;
  return matched.length === 0 || matched[0].name === routerName.home ? [] : matched;
});
</script>

<style scoped>
.trigger {
  font-size: 20px;
  line-height: 64px;
  padding: 0 15px;
  cursor: pointer;
  position: relative;
  top: -2px;
  transition: color 0.3s;
}

.trigger:hover {
  color: #1890ff;
}

@media all and (max-width: 600px) {
  .header-left {
    height: 100%;
    display: flex;
    align-items: center;
  }

  .trigger {
    position: relative;
    top: 1px;
  }

  .header-breadcrumb {
    display: none !important;
  }
}
</style>

<style>
.ant-dropdown-menu-vertical {
  border-radius: 8px !important;
}
</style>