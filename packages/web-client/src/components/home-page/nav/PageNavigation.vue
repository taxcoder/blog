<template>
  <div id="page-nav" :class="{ active: isActive, 'add-filter': isFilter, bgColor: isMinWidth }">
    <left-navigation />
    <right-navigation />
  </div>
</template>

<script setup>
import LeftNavigation from '@/components/home-page/nav/LeftNavigation.vue';
import RightNavigation from '@/components/home-page/nav/RightNavigation.vue';
import { computed } from 'vue';
import { minWidth } from '@/config';

const props = defineProps({
  scrollStatus: Object,
  screenWidth: Number,
});

const isFilter = computed(() => {
  return props.scrollStatus.current > window.innerHeight;
});

const isActive = computed(() => {
  return props.scrollStatus.current > 0 || props.screenWidth <= minWidth;
});

const isMinWidth = computed(() => {
  return props.scrollStatus.current === 0 && props.screenWidth <= minWidth;
});
</script>

<style scoped>
#page-nav {
  display: flex;
  position: fixed;
  width: 100%;
  padding: 20px 40px 10px 40px;
  z-index: 1000;
  transition: all 0.5s ease-out;
  box-sizing: border-box;
  min-width: 360px;
}

#page-nav.active {
  padding: 0 0 10px 0;
  background-color: rgb(255, 255, 255);
  backdrop-filter: blur(50px);
}

#page-nav.bgColor {
  background-color: rgba(255, 255, 255, 0) !important;
  backdrop-filter: blur(0) !important;
}

#page-nav.add-filter {
  filter: drop-shadow(0 1px 5px #ccc);
  -webkit-filter: drop-shadow(0 1px 5px #ccc);
}
</style>