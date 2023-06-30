<template>
  <div id="page-footer" :class="widthAdaption">
    <p>
      <div>@{{ year }}{{ currentDate }} By {{ base.getWebSite.webSiteName }}</div>
      <div>本站已运行 {{ getEmptyDate }}</div>
    </p>
    <p>
      <div>浙公网安备 33032202000202号</div>
      <div>湘ICP备2023005418号</div>
    </p>
  </div>
</template>

<script setup lang="ts">
import moment from 'moment';
import { computed, ref, inject } from 'vue';

import { useBaseStore } from '@/stores/base';

const base = useBaseStore();

const screenWidth: any = inject('screenWidth');

const year = ref<number>(2023);

const currentDate = computed(() => {
  let ment = parseInt(moment().format('y'));
  return ment - year.value <= 0 ? '' : '-' + ment;
});

const getEmptyDate = computed(() => {
  return '365天12时24分35秒';
});

const widthAdaption = computed(() => {
  return { active: screenWidth.value <= 600 };
});
</script>

<style scoped>
#page-footer {
  width: 100%;
  margin: 85px auto 0 auto;
  font-weight: 300;
  font-size: 0.975rem;
  padding: 60px 60px 10px 60px;
  box-sizing: border-box;
}

#page-footer.active {
  padding-top: 20px;
  margin-top: 0 !important;
}

#page-footer > p {
  height: 2rem;
  display: grid;
  align-items: center;
  grid-template-columns: 50% 50%;
}

#page-footer.active > p {
  grid-template-columns: 100%;
  grid-auto-rows: 50% 50%;
  height: 50px;
}

#page-footer > p > div {
  padding: 0 5px;
  display: inline-block;
}

#page-footer.active > p > div {
  text-align: center !important;
  font-size: 0.95rem;
}

#page-footer > p > div:last-child {
  text-align: right;
}
</style>