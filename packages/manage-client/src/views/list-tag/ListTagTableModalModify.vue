<template>
  <a-modal v-model:open="open" title="更新" :closable="false" class="modal-modify">
    <template #footer>
      <a-button key="back" @click="cancel">返回</a-button>
      <a-button key="submit" type="primary" :loading="loading" @click="handleOk">确定</a-button>
    </template>
    <a-spin :spinning="spinning">
      <a-input v-model:value="inputValue" show-count :maxlength="20" style="margin-bottom: 10px" />
      <div class="info">取消文章关联：</div>
      <a-checkbox v-model:checked="list.checkBoxAll" :indeterminate="list.indeterminate" @change="change">
        全选
      </a-checkbox>
      <a-checkbox-group v-model:value="list.checkList" :options="options" style="padding-bottom: 10px" />
    </a-spin>
  </a-modal>
</template>

<script setup lang="ts">
import { useAuthTag } from '@tanxiang/apis';
import { message } from 'ant-design-vue';

const auth = useAuthTag();

const modify = ref<any>({});
const loading = ref<boolean>(false);
const open = ref<boolean>(false);
const inputValue = ref<string>('');
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

const updateDataSource: any = inject('updateDataSource');

const showModal = (key: any) => {
  modify.value = key;
  open.value = true;
  auth
    .tagArticles(key.id)
    .then((success: any) => list.articles.push(...success))
    .catch((error: any) => message.error(error))
    .finally(() => (spinning.value = false));
};

const handleOk = () => {
  if (modify.value.name === inputValue.value && !list.checkList.length) return message.error('数据未变化，无法提交！');
  loading.value = true;
  auth
    .tagUpdate(
      modify.value.id,
      modify.value.name === inputValue.value ? null : inputValue.value,
      !!list.checkList.length ? list.checkList : null
    )
    .then(() => {
      message.success('更新成功！');
      if (modify.value.name !== inputValue.value) updateDataSource(modify.value.id, 'name', inputValue.value);
      if (list.checkList.length > 0) {
        list.articles.filter((item: any) => list.checkList.every((check: number) => item.id != check));
      }
    })
    .catch((error: any) => message.error(error ? error : '更新失败！'))
    .finally(() => (loading.value = false));
};

const cancel = () => {
  modify.value = {};
  open.value = false;
};

const change = (e: Event) => (list.checkList = !e.target.checked ? [] : list.articles.map((option: any) => option.id));

const options = computed(() => list.articles.map((article: any) => ({ label: article.title, value: article.id })));

watch(
  () => modify.value,
  (newModify: any) => (inputValue.value = newModify.name)
);

watch(
  () => list.checkList,
  (newList: any[]) => {
    list.indeterminate = !!newList.length && newList.length !== options.value.length;
    list.checkBoxAll = newList.length === options.value.length;
  }
);

defineExpose({ showModal });
</script>

<style scoped>
.modal-modify .info {
  font-weight: 700;
  padding: 6px 3px;
}
</style>

<style>
.modal-modify .ant-checkbox-wrapper {
  padding: 8px 12px;
}
</style>