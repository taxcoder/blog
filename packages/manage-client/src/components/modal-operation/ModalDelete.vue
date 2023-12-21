<template>
  <a-modal
    v-model:open="open"
    :title="title"
    :bodyStyle="bodyStyle"
    :closable="false"
    @ok="clickOk"
    @cancel="cancel"
    class="modal-delete"
    :centered="true"
    :width="props.width"
    :cancelButtonProps="cancelButtonProps"
    :okButtonProps="getOkButtonProps"
    :wrapClassName="wrapClassName"
  >
    <slot name="content"></slot>
    <delete-link ref="link" :isDisplay="isDisplay" />
    <slot name="other" />
  </a-modal>
</template>

<script setup lang="ts">
import { messageLoading } from '@/config/message';

import { ref, computed, nextTick } from 'vue';
import DeleteLink from '@/components/modal-operation/DeleteLink.vue';

const link = ref<any>();
const data = ref<any>({});
const open = ref<boolean>(false);
const isDisplay = ref<boolean>(true);

const props = defineProps({
  okClick: { type: Function, required: true },
  width: { type: Number, default: 420 },
  title: { type: String, default: '删除' },
  wrapClassName: { type: String, default: '' },
  notDisabled: { type: Boolean, default: false },
  bodyStyle: { type: Object, default: {} },
  cancelButtonProps: { type: Object, default: {} },
  okButtonProps: { type: Object, default: {} },
});

const showModal = (key: any, fn: Function, flag = true) => {
  data.value = key;
  open.value = true;
  isDisplay.value = flag;
  nextTick(() => fn(key, link.value, true));
};

const clickOk = () => {
  let list = link.value.list;
  messageLoading('删除中');
  props.okClick(data, list, cancel);
};

const cancel = () => {
  open.value = false;
  data.value = {};
  link.value.list.articles = [];
  link.value.list.checkList = [];
};

const getOkButtonProps = computed(() => {
  let ok = props.okButtonProps;
  ok['disabled'] = isDisabled.value;
  return ok;
});

const isDisabled = computed(() => {
  return (
    !props.notDisabled && (link.value ? link.value.list.checkList.length !== link.value.list.articles.length : true)
  );
});

defineExpose({ showModal, cancel });
</script>

<style scoped></style>

<style>
.modal-delete .ant-checkbox-wrapper {
  padding: 8px 12px;
}
</style>
