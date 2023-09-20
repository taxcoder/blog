<template>
  <user-container title="公告栏目" iconClass="icon-gonggao1" :size="25">
    <template v-slot:content>
      <div class="board-content">
        <el-text size="small">{{ bulletinBoard }}</el-text>
      </div>
    </template>
  </user-container>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useGlobalStore } from '@/stores/global';

const global: any = useGlobalStore();

const bulletinBoard = computed(() => global.getWebSite.bulletinBoard);
</script>

<style scoped>
.horn {
  width: 30px;
}

.board-content {
  width: 100%;
  padding-top: 6px;
  box-sizing: border-box;
  min-height: 75px;
}
</style>
