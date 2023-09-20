<template>
  <el-input size="large" placeholder="搜索" resize="none" v-model="input" @input="search">
    <template #prefix>
      <span>
        <n-spin v-show="isLoading" :size="13" style="width: 15px" stroke="#606266" :stroke-width="15" />
        <el-icon v-show="!isLoading">
          <Search />
        </el-icon>
      </span>
    </template>
  </el-input>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import { Search } from '@element-plus/icons-vue';

let input = ref('');

let isLoading = ref(false);

const search = () => {
  isLoading.value = true;
};

watch(
  () => input.value,
  (newValue: string) => {
    isLoading.value = newValue.length !== 0;
  }
);
</script>

<style>
.search-message-box .el-input {
  padding-left: 15px !important;
  padding-right: 15px !important;
}
</style>
