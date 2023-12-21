<template>
  <div style="height: 100%">
    <md-editor
      ref="editor"
      v-if="route.meta.editor"
      :toolbarsExclude="['github']"
      :autoDetectCode="true"
      v-model="text"
      :showToolbarName="showToolbarName"
      :toolbars="toolbars"
      @save="onSave"
      @input="onInput"
      @onUploadImg="uploadImageEssay"
      :footers="['markdownTotal', '=', 0, 'scrollSwitch']"
    >
      <template #defToolbars>
        <MarkExtension :showToolbarName="showToolbarName" />
        <EmojiExtension :showToolbarName="showToolbarName" />
      </template>
      <template #defFooters>
        <TimeNow />
      </template>
    </md-editor>

    <a-modal
      v-model:open="open"
      title="填入自己的心情"
      :closable="false"
      @ok="clickOk"
      @cancel="cancel"
      class="modal-essay"
      :centered="true"
      :width="420"
      :okButtonProps="{ disabled: isDisabled }"
    >
      <a-cascader
        v-model:value="modelValue"
        :options="options"
        :showCheckedStrategy="Cascader.SHOW_CHILD"
        popupClassName="popup"
        placement="topLeft"
        placeholder="请选择Emoji"
      />
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';

import { Cascader } from 'ant-design-vue';

import { MdEditor } from 'md-editor-v3';
import { toolbars } from '@/config/md-config';

import TimeNow from '@/components/markdown/time-now/TimeNow.vue';
import MarkExtension from '@/components/markdown/mark-extension/MarkExtension.vue';
import EmojiExtension from '@/components/markdown/emoji-extension/EmojiExtension.vue';

import { useRoute, useRouter } from 'vue-router';
import { useEssayStore } from '@/stores/essay';
import { useBaseStore } from '@/stores/base';
import { useAuthEssay } from '@tanxiang/apis';
import { messageError, messageLoading, messageSuccess, messageWarning } from '@/config/message';
//@ts-ignore
import useUploadImage from '@/hooks/useUploadImage';

const route: any = useRoute();
const router: any = useRouter();
const auth: any = useAuthEssay();
const base: any = useBaseStore();
const essay: any = useEssayStore();

const editor = ref<any>();
const ip = ref<string>('');
const value = ref<string>('');
const text = ref<string>('');
const open = ref<boolean>(false);
const initial = ref<string>('');
const showToolbarName = ref<boolean>(false);

const modelValue = ref<string[]>([]);

const { uploadImageEssay } = useUploadImage(editor);

// 每次离开就把数据保存再本地
onUnmounted(() => {
  essay.setContent(text.value);
});
// 每次进入就从本地读取
onMounted(() => (text.value = essay.getContent));
// 打开modal
const onSave = () => {
  if (text.value === '' || text.value.length === 0) return messageWarning('内容未变化！');
  open.value = true;
};
//@ts-ignore
const onInput = (event: Event) => essay.setContent(event.currentTarget.innerText);

const clickOk = () => {
  if (text.value === initial.value) return messageError('内容未变化！');
  messageLoading('随笔上传中');
  auth
    .addEssay(text.value, modelValue.value[1])
    .then((success: any) => {
      open.value = false;
      initial.value = text.value;
      messageSuccess(success.message);
    })
    .catch((error: any) => messageError(!error || error.name ? '添加失败！' : error));
};

const cancel = () => (modelValue.value = []);

const isDisabled = computed(() => !modelValue.value || modelValue.value.length === 0);

const options = computed(() => {
  if (Object.keys(base.getEmojis).length === 0) return [];
  let keys: any[] = Object.keys(base.getEmojis);
  let values: any[] = Object.values(base.getEmojis);
  return keys
    .map((key: any, index: number) => ({
      label: key,
      value: key,
      children: values[index].map((v: any) => ({
        label: v.icon,
        value: v.id,
      })),
    }))
    .reverse();
});
</script>

<style scoped>
#md-editor-v3 {
  height: 100%;
}
</style>

<style>
.popup .ant-cascader-menu:first-child {
  height: var(--emoji-container-height);
}

.popup .ant-cascader-menu:nth-child(even) {
  height: var(--emoji-container-height);
  width: var(--emoji-container-width);
}

.popup .ant-cascader-menu:nth-child(even) li {
  width: var(--emoji-content-width);
  height: var(--emoji-content-height);
  font-size: 22px;
  padding: 0;
  display: inline-block;
}

.popup .ant-cascader-menu:nth-child(even) li div {
  width: 100%;
  height: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.modal-essay .ant-modal-body {
  margin: 20px 0;
}

.modal-essay .ant-modal-body .ant-cascader {
  width: 100%;
}

.modal-essay .ant-modal-footer {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
