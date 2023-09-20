<template>
  <div id="action">
    <a-button type="text" size="large" style="width: var(--header-user-height)">
      <BellOutlined :style="{ fontSize: '18px' }" />
    </a-button>
    <a-dropdown placement="bottom" trigger="hover" class="dropdown-user">
      <a-button type="text">
        <a-avatar :size="28" :src="head"></a-avatar>
        <span class="user-name">管理员：谭翔</span>
      </a-button>
      <template #overlay>
        <a-menu>
          <a-menu-item>
            <ReloadOutlined />
            重新加载
          </a-menu-item>
          <a-menu-item>
            <CloseOutlined />
            关闭标签页
          </a-menu-item>
          <a-divider style="margin: 2px 0 2px 0" />
          <a-menu-item>
            <VerticalAlignTopOutlined :rotate="270" />
            关闭左侧标签页
          </a-menu-item>
          <a-menu-item>
            <VerticalAlignTopOutlined :rotate="90" />
            关闭右侧标签页
          </a-menu-item>
          <a-divider style="margin: 2px 0 2px 0" />
          <a-menu-item>
            <PicCenterOutlined />
            关闭其他标签页
          </a-menu-item>
          <a-menu-item>
            <LineOutlined />
            关闭所有标签页
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
    <a-button type="text" size="large" style="width: var(--header-user-height)">
      <SettingOutlined />
    </a-button>
  </div>
</template>

<script setup lang="ts">
import head from '@/assets/image/img.png';

import {
  BellOutlined,
  CloseOutlined,
  LineOutlined,
  PicCenterOutlined,
  ReloadOutlined,
  SettingOutlined,
  VerticalAlignTopOutlined,
} from '@ant-design/icons-vue';
</script>

<style scoped>
#action {
  height: 100%;
  line-height: var(--header-user-height);
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.dropdown-user {
  height: 100%;
}

.dropdown-user .user-name {
  padding-left: 5px;
}
</style>

<style></style>