<template>
  <el-button type="primary" class="side-button" tag="div" @click="returnTop()">
    <template v-slot:icon>
      <n-icon size="23">
        <ArrowUpOutline />
      </n-icon>
    </template>
  </el-button>
</template>

<script setup lang="ts">
import ArrowUpOutline from '@/components/icon-svg/ArrowUpOutline.vue';

const setBack: Function = inject('isBack');

const returnTop = () => {
  window.scrollTo({ top: 0 });
  setBack();
};
</script>

<style scoped></style>
