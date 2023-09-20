<template>
  <div
    id="page-nav"
    :class="{
      active: isActive,
      phoneActive: isActive && isPhone,
      pcActive: isActive && !isPhone,
      removeActive: !isActive && isRemoveActive && !isPhone,
      phoneRemoveActive: !isActive && isRemoveActive && isPhone,
      init: !isRemoveActive && !isPhone,
      'add-filter': isFilter,
    }"
  >
    <left-navigation />
    <right-navigation />
  </div>
</template>

<script setup lang="ts">
import { computed, watch, ref, inject } from 'vue';
import { minWidth } from '@/config';

import { useRoute } from 'vue-router';

const route = useRoute();
const count = ref<number>(0);

const scrollStatus = inject('scrollStatus');

const props: any = defineProps({
  screenWidth: Number,
});

const isFilter = computed(() => scrollStatus.current > window.innerHeight);

const isActive = computed(() => {
  if (scrollStatus.current !== 0 && count.value === 0) count.value++;
  return scrollStatus.current > 0;
});

const isPhone = computed(() => {
  return props.screenWidth <= minWidth;
});

const isRemoveActive = computed(() => count.value > 0);

watch(
  () => route.name,
  () => {
    count.value = 0;
  },
  { immediate: true }
);
</script>

<style scoped>
#page-nav {
  display: flex;
  position: fixed;
  width: 100%;
  z-index: 1000;
  box-sizing: border-box;
  min-width: 360px;
}

#page-nav.phoneActive {
  padding-bottom: 10px;
  background-color: var(--current-color);
  backdrop-filter: blur(50px);
}

#page-nav.pcActive {
  animation: useActive 0.3s linear forwards;
}

#page-nav.removeActive {
  animation: removeActive 0.3s linear forwards;
}

#page-nav.phoneRemoveActive {
  backdrop-filter: none;
  background-color: rgba(255, 255, 255, 0);
}

#page-nav.init {
  padding: 20px 40px 10px 40px;
}

#page-nav.add-filter {
  filter: drop-shadow(0 1px 5px #ccc);
  -webkit-filter: drop-shadow(0 1px 5px #ccc);
}

@keyframes removeActive {
  100% {
    padding: 20px 40px 10px 40px;
    backdrop-filter: none;
    background-color: rgba(255, 255, 255, 0);
  }
  0% {
    padding: 0 0 10px 0;
    background-color: var(--current-color);
    backdrop-filter: blur(50px);
  }
}

@keyframes useActive {
  0% {
    padding: 20px 40px 10px 40px;
    backdrop-filter: none;
    background-color: rgba(255, 255, 255, 0);
  }
  100% {
    padding: 0 0 10px 0;
    background-color: var(--current-color);
    backdrop-filter: blur(50px);
  }
}
</style>
