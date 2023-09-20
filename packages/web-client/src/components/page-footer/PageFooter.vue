<template>
  <div id="page-footer" :class="widthAdaption">
    <p>
      <span>@{{ year }}{{ currentDate }} By {{ webSiteName }}</span>
      <span>本站已运行 {{ time }}</span>
    </p>
    <p>
      <span>浙公网安备 33032202000202号</span>
      <span>湘ICP备2023005418号</span>
    </p>
  </div>
</template>

<script setup lang="ts">
import moment from 'moment';

import { computed, ref, inject, onMounted, nextTick } from 'vue';

import { useBaseStore } from '@/stores/base';
import { useGlobalStore } from '@/stores/global';
//@ts-ignore
import { useDate } from '@tanxiang/utils/index.ts';

const base = useBaseStore();
const global = useGlobalStore();
const { headway } = useDate();

const time = ref<string>('');
const timer = ref<number | null>(null);

const screenWidth: any = inject('screenWidth');

onMounted(() => {
  nextTick(() => loopUpdateTime());
});

const loopUpdateTime = () => {
  timer.value = setInterval(() => {
    time.value = global.getWebSite ? headway(global.getWebSite.createTime) : '';
    // loopUpdateTime();
  }, 1000 * 60);
};

const currentDate = computed(() => {
  let ment = parseInt(moment().format('y'));
  return ment - year.value <= 0 ? '' : '-' + ment;
});

const webSiteName = computed(() => global.getWebSite.userName);

const year = computed(() => new Date(global.getWebSite.createTime).getFullYear());

const widthAdaption = computed(() => ({ active: screenWidth.value <= 600 }));
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
  padding-top: 40px;
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

#page-footer > p > span {
  padding: 0 5px;
  display: inline-block;
}

#page-footer.active > p > span {
  text-align: center !important;
  font-size: 0.95rem;
}

#page-footer > p > span:last-child {
  text-align: right;
}

@media all and (max-width: 1200px) {
  #page-footer {
    margin-top: 70px !important;
  }
}
</style>
