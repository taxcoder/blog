<template>
  <el-scrollbar height="100%" class="scroll-menu">
    <div id="directory">
      <div id="directory-content" :class="{ active: isActive }" :style="{ '--top-size': `${size}px` }">
        <el-tree
          class="tree-settings"
          :data="option"
          node-key="level"
          :highlight-current="true"
          :auto-expand-parent="true"
          :accordion="true"
          :indent="8"
          :height="600"
          @node-click="nodeClick"
        >
          <template #default="{ node, data }">
            <span v-if="data.label.length <= 15">{{ data.label }}</span>
            <el-tooltip v-else effect="dark" placement="right" :content="data.label">{{ data.label }}</el-tooltip>
          </template>
        </el-tree>
      </div>
    </div>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { watch, inject, ref } from 'vue';

import { useArticleStore } from '@/stores/article';

import { usePage } from '@tanxiang/utils';

import { useRoute } from 'vue-router';

const article = useArticleStore();
const { getOffsetTop } = usePage();

const scrollBar: any = inject('scrollBar');
const scrollStatus: any = inject('scrollStatus');
const screenHeight: any = inject('screenHeight');

const buffer = ref<number>(10);
const top = ref<number>(0);
const size = ref<number>(0);
const option = ref<any[]>([]);
const flag = ref<boolean>(false);
const isClick = ref<boolean>(false);
const isActive = ref<boolean>(false);

const isDeposit = (options: any[], option: any, index: number) => {
  if (options.length === 0) options.push(option);
  else if (option.level == options[index].level) options.push(option);
  else if (option.level < options[index].level) options.push(option);
  else {
    isDeposit(options[index].children, option, options[index].children.length - 1);
  }
};

const nodeClick = (node: any) => {
  //@ts-ignore
  document.getElementById(node.label).scrollIntoView();
  let nav: any = document.getElementById('page-nav')?.clientHeight;
  buffer.value = 10;
  if (nav) scrollBar.value.scrollBy({ top: -nav - 20 });
};

const isMove = (newValue: number) => {
  let nav: any = document.getElementById('page-nav')?.clientHeight;
  if (nav) {
    isActive.value = newValue >= top.value - nav;
    size.value = newValue + buffer.value + nav + (flag.value ? 59 : 0) - top.value;
  }
};

const getMenuTop = () => {
  let offsetTop = getOffsetTop(document.getElementById('directory'));
  if (!offsetTop) return;
  // 如果top的值为0，且距离顶部的高度不是0，进行赋值
  top.value = offsetTop;
};

watch(
  () => scrollStatus.current,
  (newValue: number) => {
    if (isClick.value) return;
    if (top.value === 0) getMenuTop();
    isMove(newValue);
  }
);

watch(
  () => screenHeight.value,
  () => getMenuTop()
);

watch(
  () => article.getDirectory,
  (directory: any) => {
    if (!directory) return;

    let options: any[] = [];
    directory.forEach((dir: any, index: number) => {
      let option: any = {
        label: dir.text,
        level: dir.level,
        children: [],
      };

      if (index === 0) options.push(option);
      else isDeposit(options, option, options.length - 1);
    });

    option.value = options;
  },
  { deep: true, immediate: true }
);
</script>

<style scoped>
#directory {
  background-color: white;
  position: relative;
  border-radius: 7px;
  width: 100%;
}

#directory-content {
  position: absolute;
  top: 0;
  width: 100%;
  left: 0;
  height: 100%;
  box-sizing: border-box;
}

#directory-content.active {
  top: var(--top-size);
}

#directory-content .tree-settings {
  padding: 20px 15px;
  border-radius: 7px;
  max-height: 700px;
  overflow: auto;
  box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.05);

  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
}

#directory-content .tree-settings::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}

.directory {
  width: 25px;
}

.directory-name {
  font-size: 1.05rem;
  line-height: 30px;
  text-align: right;
  font-family: 'round', sans-serif;
  margin-right: 10px;
}

.markdown-title {
  font-size: 0.925rem;
  box-sizing: border-box;
  margin-top: 10px;
}

.markdown-title:first-child {
  margin-top: 0;
}

.markdown-title-a {
  cursor: pointer;
}

.markdown-title-a:hover {
  color: #409eff;
}
</style>
