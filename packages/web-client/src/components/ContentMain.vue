<template>
  <div id="list" :style="{ height: '100%' }">
    <el-container>
      <el-aside :width="asideWidth" v-if="!props.position">
        <transition name="left-slide-fade">
          <slot name="user-left">
            <user-index class="user-left" :show="show" :showUserInfo="showUserInfo" />
          </slot>
        </transition>
      </el-aside>
      <el-main>
        <slot />
      </el-main>
      <el-aside :width="asideWidth" v-if="props.position">
        <transition name="slide-fade">
          <slot name="user-right">
            <user-index class="user-right" :show="show" :showUserInfo="showUserInfo" />
          </slot>
        </transition>
      </el-aside>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { inject, computed } from 'vue';
import { useBaseStore } from '@/stores/base';
import UserIndex from '@/components/user-info/UserIndex.vue';

const base = useBaseStore();

const screenWidth: any = inject('screenWidth');

const props = defineProps({
  position: { type: Boolean, required: true },
  showUserInfo: { type: Boolean, default: true },
  isDraw: { type: Boolean, default: false },
});

const show = computed(() => screenWidth.value > 1200 && base.getOpenUserActive);

const asideWidth = computed(() => {
  return !props.isDraw && show.value ? '330px' : '0';
});
</script>

<style scoped>
#list {
  max-width: 1260px;
  margin: auto;
  min-height: 500px;
  position: relative;
  padding: 60px 15px 0 15px;
  overflow: hidden;
  box-sizing: border-box;
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
</style>
