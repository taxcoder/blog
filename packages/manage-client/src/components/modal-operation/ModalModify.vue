<template>
  <a-modal
    v-model:open="open"
    title="更新"
    :closable="false"
    @ok="clickOk"
    @cancel="cancel"
    class="modal-modify"
    :key="Math.random()"
    :centered="true"
    :width="420"
  >
    <delete-link ref="link" :isDisplay="isDisplay">
      <template #input>
        <a-input v-model:value="inputValue" show-count :maxlength="props.maxLength" style="margin-bottom: 10px" />
      </template>
    </delete-link>
    <slot name="other" />
  </a-modal>
</template>

<script setup lang="ts">
import { messageLoading, messageError } from '@/config/message';

import { ref, watchEffect, nextTick } from 'vue';
import DeleteLink from '@/components/modal-operation/DeleteLink.vue';

const link = ref<any>();
const modify = ref<any>({});
const open = ref<boolean>(false);
const inputValue = ref<string>('');
const isDisplay = ref<boolean>(true);

const props = defineProps({
  okClick: { type: Function, default: () => {} },
  maxLength: { type: Number, default: 20 },
});

const showModal = (key: any, fn: Function, flag = true, isOpen = true) => {
  modify.value = key;
  open.value = isOpen;
  isDisplay.value = flag;
  nextTick(() => fn(key, link.value, false));
};

const clickOk = () => {
  let list = link.value.list;
  if (modify.value.name === inputValue.value && !list.checkList.length) return messageError('数据未变化，无法提交！');
  messageLoading('更新中');
  props.okClick(modify, inputValue.value, list, cancel);
};

const cancel = () => {
  open.value = false;
  modify.value = {};
  link.value.list.articles = [];
  link.value.list.checkList = [];
};

watchEffect(() => {
  if (link.value && modify.value.name) inputValue.value = modify.value.name;
});

defineExpose({ showModal });
</script>

<style scoped></style>

<style>
.modal-modify .ant-checkbox-wrapper {
  padding: 8px 12px;
}
</style>
