<template>
  <div id="title">
    <div class="page-title">{{ props.title }}</div>
    <div class="typed" v-show="typedShow">
      <vuetyped :strings="strings" :loop="true" :smart-backspace="true">
        <div class="typing" />
      </vuetyped>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive } from 'vue';
const route = useRoute();

let strings = reactive(['君子成人之美，不成人之恶', '智者不惑，仁者不忧，勇者不惧', '静以修身，检以养德']);

const props = defineProps({
  title: {
    type: String,
    require: true,
  },
});

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

  font-family: HarmonyOS, sans-serif;
}

.page-title {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  bottom: 50px;
  width: 100%;
  font-size: 3.25rem;
}

.typed {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  font-size: 1.35rem;
  font-family: 'pacifico', sans-serif;
}
</style>