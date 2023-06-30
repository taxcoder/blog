<template>
  <el-input
    size="large"
    placeholder="搜索"
    resize="none"
    :prefixIcon="isPrefixIcon"
    v-model="input"
    @input="search"
  ></el-input>
</template>
<script setup>
import { ref } from 'vue';
import { LoadingOutlined } from '@ant-design/icons-vue';
import { Search } from '@element-plus/icons-vue';

let input = ref('');

let isLoading = ref(false);

const isPrefixIcon = computed(() => (isLoading.value ? LoadingOutlined : Search));

const search = () => {
  isLoading.value = true;
  // console.log(input.value);
};
</script>

<style>
.search-message-box .el-input {
  padding-left: 15px !important;
  padding-right: 15px !important;
}
</style>
