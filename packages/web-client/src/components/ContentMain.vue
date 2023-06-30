<template>
  <div id="list" :class="listClass" :style="{ height: height }">
    <transition :name="position ? 'slide-fade' : 'left-slide-fade'">
      <user-index v-if="!position" :show="show" @userHeight="userHeight" />
    </transition>
    <slot />
    <transition :name="position ? 'slide-fade' : 'left-slide-fade'">
      <user-index v-if="position" :show="show" @userHeight="userHeight" />
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject, watch } from 'vue';
import { useBaseStore } from '@/stores/base';

import UserIndex from '@/components/user-info/UserIndex.vue';

const base = useBaseStore();

const screenWidth: any = inject('screenWidth');

const props = defineProps({
  position: { type: Boolean, required: true },
  height: { type: String, required: true },
});

const emit = defineEmits(['user-height']);

const userHeight = (height: number) => emit('user-height', height);

const show = computed(() => screenWidth.value > 1200 && base.getOpenUserActive);

const listClass = computed(() => {
  return { 'user-right': props.position, 'user-left': !props.position, active: isActive.value };
});

const isActive = computed(() => {
  return screenWidth.value <= 1200 && base.getOpenUserActive ? true : !base.getOpenUserActive;
});
</script>

<style scoped>
#list {
  width: 1200px;
  display: grid;
  justify-content: center;
  margin: 100px auto 0 auto;
  transition: all 0.3s;
  min-height: 500px;
  position: relative;
}

#list.active {
  animation: magic 0.3s linear forwards;
}

#list.user-left.active {
  animation-delay: 0.3s;
}

#list.user-left {
  grid-template-columns: var(--user-info) calc(100% - var(--user-info));
}

#list.user-right {
  animation: magic-enter 0.3s forwards linear;
}

#list.user-right.active {
  animation: magic 0.3s forwards linear;
}

@media screen and (max-width: 1200px) {
  #list {
    width: 100%;
    justify-items: center;
  }
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: transform 0.3s ease-out;
}

.left-slide-fade-enter-active,
.left-slide-fade-leave-active {
  transition: transform 0.3s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(3000px);
}

.left-slide-fade-enter-from,
.left-slide-fade-leave-to {
  transform: translateX(-3000px);
}

@keyframes magic-enter {
  0% {
    grid-template-columns: 100% 0;
  }
  100% {
    grid-template-columns: calc(100% - var(--user-info)) var(--user-info);
  }
}

@keyframes magic {
  0% {
    grid-template-columns: calc(100% - var(--user-info)) var(--user-info);
  }
  100% {
    grid-template-columns: 100% 0;
  }
}
</style>