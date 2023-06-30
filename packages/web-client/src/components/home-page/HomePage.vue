<template>
  <div id="home-page" :style="setBackImage()">
    <page-navigation :scrollStatus="scrollStatus" :screenWidth="screenWidth" />
    <page-title :title="props.title" />
    <flip-down :bottom="30" to="start" />
  </div>
</template>

<script setup>
import { inject } from 'vue';
import { useBaseStore } from '@/stores/base';
import FlipDown from '@/common/filp-down/FlipDown.vue';
import PageTitle from '@/components/home-page/PageTitle.vue';

const base = useBaseStore();

const scrollStatus = inject('scrollStatus');
const screenWidth = inject('screenWidth');

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});

const setBackImage = () => {
  return {
    backgroundImage:
      'url(' +
      new URL('@/assets/images/e00dbfe7082c9c50a9aaa8158dc426f1.jpeg', import.meta.url).href +
      ')',
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
