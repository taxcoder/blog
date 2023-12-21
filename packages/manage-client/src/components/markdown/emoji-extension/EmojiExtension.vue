<template>
  <DropdownToolbar :title="title" :visible="state.visible" @onChange="onChange">
    <template #overlay>
      <div class="emoji-container">
        <a-segmented
          v-model:value="value"
          :options="data"
          :block="true"
          style="height: 34px; margin: 10px 0"
          @change="segmentedChange"
        />
        <ol class="emojis">
          <li
            v-if="data.length > 0"
            v-for="emoji of dataSource[current]"
            :key="`emoji-${emoji.id}`"
            @click="emojiHandler(emoji.icon)"
            v-text="emoji.icon"
          />
        </ol>
      </div>
    </template>
    <template #trigger>
      <svg class="md-editor-icon emoji" aria-hidden="true">
        <use xlink:href="#icon-emoji"></use>
      </svg>
      <div v-if="showToolbarName" class="md-editor-toolbar-item-name item-name">{{ title }}</div>
    </template>
  </DropdownToolbar>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import { reactive, onMounted, ref } from 'vue';

import { DropdownToolbar } from 'md-editor-v3';
import type { InsertContentGenerator } from 'md-editor-v3';

import { useAuthEmoji } from '@tanxiang/apis';
import { useBaseStore } from '@/stores/base';
import { messageError } from '@/config/message';

const auth = useAuthEmoji();
const base = useBaseStore();

const value = ref<string>('');
const current = ref<number>(0);
const title = ref<string>('Emoji');

const data = reactive<string[]>([]);
const dataSource = reactive<any[]>([]);

onMounted(() => {
  if (Object.keys(base.getEmojis).length === 0) {
    auth
      .emojiList()
      .then((success: any) => {
        data.push(...Object.keys(success.data));
        dataSource.push(...Object.values(success.data));
        value.value = data[current.value];
        base.setEmojis(success.data);
      })
      .catch(() => messageError('网络错误！'));
  } else {
    data.push(...Object.keys(base.getEmojis));
    dataSource.push(...Object.values(base.getEmojis));
    value.value = data[current.value];
  }
});

const props = defineProps({
  insert: {
    type: Function as PropType<(generator: InsertContentGenerator) => void>,
    default: () => null,
  },
  showToolbarName: Boolean,
});

const emojiHandler = (emoji: string) => {
  const generator: InsertContentGenerator = () => {
    return {
      targetValue: emoji,
      select: true,
      deviationStart: 0,
      deviationEnd: 0,
    };
  };

  props.insert(generator);
  state.visible = false;
};

const state = reactive({ visible: false });

const segmentedChange = (ret: any) => {
  let index = data.indexOf(ret);
  if (index !== -1) current.value = index;
};

const onChange = (visible: boolean) => (state.visible = visible);
</script>

<style scoped>
.emoji {
  width: 24px;
  fill: currentColor;
  height: 24px;
  display: block;
  padding: 3px 0;
}

.emoji-container {
  border-radius: 3px;
  border: 1px solid #e6e6e6;
}

.item-name {
  font-weight: 700;
}

.emojis {
  position: relative;
  width: var(--emoji-container-width);
  margin: 10px 0 10px 10px;
  padding-top: 1px;
  padding-left: 1px;
  max-height: var(--emoji-container-height);
  background-color: #fff;
  overflow: auto;
}

.emojis::after {
  content: '';
  clear: left;
  display: block;
}

.emojis * {
  user-select: none;
}

.emojis li {
  cursor: pointer;
  float: left;
  height: 40px;
  width: 40px;
  overflow: hidden;
  margin: -1px 0 0 -1px;
  padding: 4px 2px;
  text-align: center;
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 23px;
}

.emojis li:hover {
  position: relative;
  border: 1px solid #63a35c;
  z-index: 12;
}

.theme-dark .emoji-container {
  border-color: #2d2d2d;
}

.theme-dark .emojis {
  background-color: inherit;
}

.theme-dark .emojis li {
  border-color: #2d2d2d;
}

.theme-dark .emojis li:hover {
  border: 1px solid #497744;
}
</style>

<style>
.emojis::-webkit-scrollbar {
  display: none;
}
</style>
