<template>
  <div id="home-page" :style="setBackImage()">
    <page-navigation :scrollStatus="scrollStatus" :screenWidth="screenWidth" />
    <page-title :title="props.title" />
    <flip-down :bottom="30" @toNode="toNode" />
  </div>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue';
import { useBaseStore } from '@/stores/base';

import { usePage } from '@tanxiang/utils';

const base = useBaseStore();
const { getOffsetTop } = usePage();

const scrollStatus: any = inject('scrollStatus');
const screenWidth: any = inject('screenWidth');
const scrollBar: any = inject('scrollBar');

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});

const toNode = () => {
  let top: any = getOffsetTop(document.getElementById('start'));
  let nav: any = document.getElementById('page-nav')?.clientHeight;
  let start: any = Math.floor((top - nav) / 10) * 10;
  if (scrollStatus.current < start) {
    scrollBar.value.scrollBy({ left: 0, top: start - scrollStatus.current < 100 ? 10 : 100 });
    window.requestAnimationFrame(toNode);
  }
};

const setBackImage = () => {
  return {
    backgroundImage:
      'url(' + new URL('@/assets/images/e00dbfe7082c9c50a9aaa8158dc426f1.jpeg', import.meta.url).href + ')',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
  };
};
</script>

<style scoped>
#home-page {
  width: 100%;
  height: 100vh;
  position: relative;
}
</style>
