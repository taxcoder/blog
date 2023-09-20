<template>
  <transition name="slide-fade">
    <el-button :dark="true" type="primary" class="side-button" tag="div" @click="changeOpenActive()" v-show="isActive">
      <template v-slot:icon>
        <n-icon size="23">
          <ArrowsDiagonalMinimize2 style="transform: rotateZ(45deg)" v-if="openActive" />
          <ArrowFit16Filled v-else />
        </n-icon>
      </template>
    </el-button>
  </transition>
</template>

<script setup lang="ts">
import { computed, ref, inject } from 'vue';
import { ArrowFit16Filled } from '@vicons/fluent';
import { ArrowsDiagonalMinimize2 } from '@vicons/tabler';
import { useBaseStore } from '@/stores/base';

const base = useBaseStore();

const screenWidth: any = inject('screenWidth');
const openActive = ref(base.getOpenActive);

const changeOpenActive = () => {
  openActive.value = !openActive.value;
  base.setOpenActive(openActive.value);
  base.setOpenUserActive(!base.getOpenUserActive);
};

const isActive = computed(() => {
  let ret = screenWidth.value > 1200;
  openActive.value = ret && base.getOpenUserActive;
  base.setOpenActive(openActive.value);
  return ret;
});
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: transform 0.5s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(200px);
}
</style>
