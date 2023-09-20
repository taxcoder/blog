<template>
  <a-layout style="height: 100%">
    <layout-sider />
    <a-layout>
      <layout-header />
      <a-layout-content>
        <div class="manage-layout-content">
          <router-view v-slot="{ Component, route }">
            <transition name="slide-fade">
              <component :is="Component" :key="route.path" />
            </transition>
          </router-view>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts"></script>

<style scoped>
.manage-layout-content {
  height: 100%;
  overflow: auto;
}

/* 谷歌，元素隐藏必须设置宽度  不然无效 */
.manage-layout-content::-webkit-scrollbar {
  width: 0;
  height: 30px;
}

/* 使用伪类选择器 ::-webkit-scrollbar ,兼容chrome和safari浏览器 */
/* display: none; 只能直接作用于body html，其他元素设置宽度的方式 */
.manage-layout-content::-webkit-scrollbar {
  display: none;
}

/* /兼容火狐/ */
/* / 兼容IE10+ */
.manage-layout-content {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.slide-fade-enter-active {
  transition: all 0.5s ease-in-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-25px);
  opacity: 0;
}
</style>