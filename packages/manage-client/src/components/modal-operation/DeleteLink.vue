<template>
  <a-spin :spinning="spinning">
    <slot name="input" />
    <div v-if="props.isDisplay">
      <div class="info">取消文章关联：</div>
      <a-checkbox
        v-model:checked="list.checkBoxAll"
        :indeterminate="list.indeterminate"
        v-if="props.isCheckBox"
        @click="checkBoAll"
      >
        全选
      </a-checkbox>
      <div class="group-list">
        <a-checkbox-group v-model:value="list.checkList" :options="options" style="padding-bottom: 10px" />
      </div>
    </div>
  </a-spin>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';

const spinning = ref<boolean>(true);

let list = reactive<{
  checkBoxAll: boolean;
  indeterminate: boolean;
  checkList: number[];
  articles: { id: number; title: string }[];
}>({
  checkBoxAll: false,
  indeterminate: false,
  checkList: [],
  articles: [],
});

const props = defineProps({
  isCheckBox: { type: Boolean, default: true },
  isDisplay: { type: Boolean, required: true },
});

const checkBoAll = () => {
  if (list.articles.length > list.checkList.length) {
    list.articles.forEach((article: any) => {
      if (list.checkList.indexOf(article.id) === -1) list.checkList.push(article.id);
    });
  } else {
    list.checkList = [];
  }
};

const options = computed(() => list.articles.map((article: any) => ({ label: article.title, value: article.id })));

watch(
  () => list.checkList,
  (newList: any[]) => {
    list.indeterminate = !!newList.length && newList.length !== options.value.length;
    list.checkBoxAll = options.value.length > 0 ? newList.length === options.value.length : false;
  },
  { deep: true, immediate: true }
);

defineExpose({ spinning, list });
</script>

<style scoped>
.info {
  font-weight: 700;
  padding: 6px 3px;
}
.group-list {
  max-height: calc(100vh / 2.5);
  overflow: auto;
}

.group-list::-webkit-scrollbar {
  display: none;
}
</style>

<style>
.group-list .ant-checkbox-group {
  display: grid;
}

.group-list .ant-checkbox-group .ant-checkbox-group-item {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.group-list .ant-checkbox-group .ant-checkbox-group-item span:last-child {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
