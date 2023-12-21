<template>
  <a-drawer :open="base.getOpen" placement="left" :width="Data.siderWidth" :closable="false" @close="close">
    <div class="web-title cursor-pointer" @click="router.push('/')">
      <svg class="icon important-w-[28px]" aria-hidden="true">
        <use xlink:href="#icon-tiantianquan"></use>
      </svg>
      <span>Light Admin</span>
    </div>
    <el-collapse v-model="activeName" accordion class="important-border-0">
      <el-collapse-item
        :title="item.label"
        :name="item.key"
        v-for="item in items"
        @click="openCollapse(item)"
        :class="separate(item)"
      >
        <el-button :class="{ active: buttonType(i) }" v-for="i in item.children" :icon="i.icon" @click="change(i.url)">
          {{ i.label }}
        </el-button>
      </el-collapse-item>
    </el-collapse>
  </a-drawer>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';

import { useRoute, useRouter } from 'vue-router';
import { useBaseStore } from '@/stores/base';

import { Data } from '@/config';
import { routerMenu } from '@/config/routerMenu';

const route = useRoute();
const router = useRouter();
const base: any = useBaseStore();

const open = ref<boolean>(false);
const activeName = ref<string>('');

const close = () => base.setOpen(false);

const change = (url: string) => {
  if (url === route.path) return;
  router.push(url);
};

const openCollapse = (item: any) => {
  if (item.children && item.children.length > 0) return;
  router.push(item.url);
};

const item = (r: any, prefix = '') => {
  return r.display !== undefined
    ? false
    : {
        label: r.label,
        key: r.key,
        icon: r.icon(),
        url: prefix + r.url,
        children:
          r.children.length === 0 || r.notShowChildren
            ? undefined
            : r.children.map((c: any) => item(c, r.url)).filter((t: any) => t !== false),
      };
};

const items = computed((): any[] =>
  routerMenu
    .map((r: any) => {
      if (r.key === 'refresh' || r.key === 'notFound') return false;
      return item(r);
    })
    .filter((r: any) => r !== false)
);

const buttonType = computed(() => (i: any) => {
  return i.url === route.path || (i.url === '/base/recovery' && route.path.startsWith('/base/recovery/'));
});

const separate = computed(() => (item: any) => {
  return {
    separate: !item.children || item.children.length === 0,
    menuActive: route.path === item.url && item.url === '/analysis',
  };
});

watch(
  () => route.path,
  (newValue: string) => {
    // 如果抽屉没有打开，则取消操作
    if (['/', '/refresh', '/404', '/login'].includes(newValue)) return;
    activeName.value = items.value.find((i: any) => i.label === route.matched[0].name).key;
  },
  { immediate: true }
);
</script>

<style scoped>
.el-collapse {
  --el-collapse-header-font-size: 16px;
}
.web-title {
  font-size: 30px;
  display: inline-flex;
  padding: 13px 0 10px 17px;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.web-title span {
  margin-left: 15px;
  font-size: 19px;
  font-weight: 700;
}

::v-deep(.el-collapse-item div) {
  height: 100%;
  flex: 1;
}

::v-deep(.el-collapse-item__wrap),
::v-deep(.el-collapse-item__header) {
  border: none;
}

::v-deep(.el-collapse-item__header) {
  background-color: rgba(255, 255, 255, 0);
  padding: 0 10px;
}

::v-deep(.separate .el-collapse-item__wrap),
::v-deep(.separate .el-collapse-item__arrow) {
  display: none;
}

::v-deep(.el-collapse-item__content) {
  padding: 0;
}

::v-deep(.el-collapse-item__content .el-button .el-icon span) {
  font-size: 14px !important;
}

::v-deep(.el-collapse-item__content .el-button) {
  width: 100%;
  border: 0;
  margin-left: 0;
  border-radius: 20px;
  font-size: 15px;
  cursor: pointer;
  justify-content: flex-start;
}

::v-deep(.el-collapse-item__content .el-button:not(:last-child)) {
  margin-bottom: 5px;
}

button.active {
  background-color: var(--el-color-primary);
  color: white;
}

::v-deep(.menuActive .el-collapse-item__header) {
  color: white;
  background-color: var(--el-color-primary);
  border-radius: 50px;
  height: 36px;
}

.menuActive {
  min-height: 48px;
  display: flex;
  align-items: center;
}
</style>