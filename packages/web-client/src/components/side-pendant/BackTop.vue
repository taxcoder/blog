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
import { inject } from 'vue';

import { ArrowUpOutline } from '@vicons/ionicons5';

const scrollBar: any = inject('scrollBar');
const screenWidth = inject('screenWidth');

const isBack: any = inject('isBack');

const returnTop = () => {
  scrollBar.value.scrollTo(0);
  isBack();
};
</script>

<style scoped></style>
