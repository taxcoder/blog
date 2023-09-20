<template>
  <div id="pendant">
    <div class="button-menu-item" v-if="flag && exceedHeight" :class="animationClass">
      <change-page />
      <change-theme />
    </div>
    <div class="button-menu" v-if="exceedHeight" :class="animationClass">
      <back-home v-if="currentRoute" />
      <open-menu />
      <back-top />
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, ref, computed, provide } from 'vue';

import { useBaseStore } from '@/stores/base';
import { useGlobalStore } from '@/stores/global';
import ChangePage from '@/components/side-pendant/ChangePage.vue';
import OpenMenu from '@/components/side-pendant/OpenMenu.vue';
import BackTop from '@/components/side-pendant/BackTop.vue';
import BackHome from '@/components/side-pendant/BackHome.vue';

import { routeName } from '@/enum';
import { useRoute } from 'vue-router';

const base = useBaseStore();
const global = useGlobalStore();
const route = useRoute();

const screenWidth: any = inject('screenWidth');
const screenHeight: any = inject('screenHeight');
const scrollStatus: any = inject('scrollStatus');

const flag = ref<boolean>(false);

provide('isBack', () => isBack());
provide('isMenuItemActive', () => isMenuItemActive());

const isBack = () => (flag.value = false);

const isMenuItemActive = () => (flag.value = !flag.value);

const currentRoute = computed(() => {
  return route.meta.name !== routeName.home;
});

const exceedHeight = computed(() => scrollStatus.current >= screenHeight.value / 2);

const animationClass = computed(() => {
  return { scroll: global.getIsContract, endScroll: !global.getIsContract };
});
</script>

<style scoped>
@import '@/styles/dark.css';

#pendant {
  position: absolute;
  bottom: 25px;
  display: flex;
  flex-direction: column;
  align-items: end;
  z-index: 100;
  right: 17px;
  opacity: 1;
}

.button-menu-item.scroll {
  animation: useScroll 0.25s linear forwards;
}

.button-menu-item.endScroll {
  animation: delScroll 0.25s linear forwards;
}

.button-menu.scroll {
  animation: useScroll 0.25s linear forwards;
}

.button-menu.endScroll {
  animation: delScroll 0.25s linear forwards;
}

.button-menu,
.button-menu-item {
  display: flex;
  flex-direction: column;
  align-items: end;
  position: relative;
}

.side-button {
  width: 35px;
  height: 35px;
  border-radius: 5px;
  margin-bottom: 5px !important;
  border: none;
}

.side-button:hover {
  border: none;
  background-color: #ff7242;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: transform 0.5s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(200px);
}

@media all and (max-width: 600px) {
  .side-button {
    width: 30px;
    height: 30px;
  }
}

@keyframes useScroll {
  0% {
    right: 0;
    opacity: 1;
  }
  100% {
    right: -35px;
    opacity: 0.7;
  }
}

@keyframes delScroll {
  0% {
    right: -35px;
    opacity: 0.7;
  }
  100% {
    right: 0;
    opacity: 1;
  }
}
</style>
