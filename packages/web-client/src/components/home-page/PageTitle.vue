<template>
  <div id="title">
    <div class="page-title">{{ props.title }}</div>
    <div class="typed" v-show="typedShow">
      <vuetyped :strings="strings" :loop="true" :smart-backspace="true" :key="global.getWebSite.text">
        <div class="typing" />
      </vuetyped>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue';
import { useRoute } from 'vue-router';
import { useGlobalStore } from '@/stores/global';

const route = useRoute();

const global = useGlobalStore();

const props = defineProps({
  title: { type: String, require: true },
});

const strings = computed(() => (global.getWebSite.text ? global.getWebSite.text : ['hello world']));

const typedShow = computed(() => {
  return strings.length !== 0 && route.meta['name'] === '首页';
});
</script>

<style scoped>
#title {
  display: flex;
  align-content: center;
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: column;
  width: 100%;
  height: calc(100% - 60px);
  color: white;
  font-family: 'round', sans-serif;
}

.page-title {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  bottom: 50px;
  width: 100%;
  font-size: 3.25rem;
  text-align: center;
  min-width: 350px;
}

.typed {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  font-size: 1.35rem;
  font-family: 'round', sans-serif;
}

@media screen and (max-width: 600px) {
  .page-title {
    font-size: 8vw;
  }
}
</style>
