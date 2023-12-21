<template>
  <div class="table-search">
    <!-- 搜索 -->
    <a-form layout="inline" :model="formState">
      <a-form-item>
        <el-input v-model="props.formState.value" :placeholder="placeholder" clearable>
          <template #prepend>
            <el-select v-model="props.formState.select">
              <el-option
                v-for="item in props.formState.key"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </template>
        </el-input>
      </a-form-item>
      <a-form-item>
        <slot name="other">
          <el-button type="primary" :icon="h(PlusCircleTwoTone)" @click="add">添加</el-button>
        </slot>
      </a-form-item>
    </a-form>

    <!-- 添加 -->
  </div>
</template>

<script setup lang="ts">
import { ref, h, watch, computed } from 'vue';

import { PlusCircleTwoTone } from '@ant-design/icons-vue';

import { useAuthSearch } from '@tanxiang/apis';

import useRequestData from '@/hooks/useRequestData';

const complete = ref<any>();
const auth = useAuthSearch();

const emit = defineEmits(['dataSource', 'current', 'add']);

const { coverDataSource, getDataSource, search } = useRequestData();

const props = defineProps({
  formState: { type: Object, required: true },
  name: { type: String, required: true },
});

const placeholder = computed(() => {
  let f = props.formState.key.filter((k: any) => k.value === props.formState.select);
  return f.length > 0 ? f[0].placeholder : '搜索';
});

const add = () => emit('add');

watch(
  () => [props.formState.value, props.formState.select],
  () => {
    search(props.name, props.formState.select, props.formState.value, emit);
  }
);
</script>

<style scoped>
.table-search {
  width: 100%;
  padding: 0 0 6px 0;
  z-index: 3;
  top: 0;
  height: 40px;
  position: sticky;
  background: #f5f5f5;
}
</style>

<style>
.table-search .el-input__wrapper {
  border-radius: 6px;
}

.table-search .ant-form-item {
  margin: 0;
}

.table-search .ant-form-item:first-child .el-select {
  min-width: 50px;
  max-width: 120px;
  height: 100%;
  border-top-right-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
}

.table-search .ant-form-item:first-child {
  flex: 1;
}

.table-search .ant-form-item:first-child .el-input__wrapper {
  max-width: 300px;
  margin-right: 10px;
  border-top-left-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
}

.table-search .ant-form-inline {
  justify-content: space-between;
  align-items: center;
}

.table-search .el-input-group--prepend .el-input-group__prepend .el-select .el-input.is_focus .el-input__wrapper,
.table-search .el-input-group--prepend .el-input-group__prepend .el-select:hover .el-input__wrapper,
.table-search .el-input-group--prepend .el-input-group__prepend .el-select .el-input.is-focus .el-input__wrapper,
.table-search .el-select .el-input__wrapper.is-focus {
  box-shadow: none !important;
  border: none !important;
}
</style>
