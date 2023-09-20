<template>
  <user-container title="人生进度条" iconClass="icon-countDown" :size="22">
    <template v-slot:content>
      <div v-for="(item, index) in process" :key="index">
        <el-text class="text-style" size="small" tag="p" type="info" v-html="currentDate(index)" />
        <el-progress
          :color="item['color']"
          :duration="3"
          :indeterminate="true"
          :percentage="currentProcess(index)"
          :stroke-width="13"
          striped
          striped-flow
        />
      </div>
    </template>
  </user-container>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, computed } from 'vue';
import moment from 'moment';
import UserContainer from '@/components/user-info/UserContainer.vue';

const hour = ref<string>(moment().format('H'));
const week = ref<string>(moment().format('d'));
const day = ref<string>(moment().format('D'));
const month = ref<string>(moment().format('M'));

const process = reactive([{ color: '' }, { color: '#e6a23c' }, { color: '#f56c6c' }, { color: '#13ce66' }]);

onMounted(() => newDate());
const newDate = () => {
  setTimeout(() => {
    hour.value = moment().format('H');
    week.value = moment().format('d');
    day.value = moment().format('D');
    month.value = moment().format('M');
  }, 1000 * 60 * 60);
};

const currentDate = computed(() => (index: number) => {
  let sBefore = '<span style="color: #409eff;">';
  let sLast = '</span>';
  switch (index) {
    case 0:
      return '今日已经过去 ' + sBefore + hour.value + sLast + ' 小时';
    case 1:
      return '这周已经过去 ' + sBefore + (week.value === '0' ? 7 : week.value) + sLast + ' 天';
    case 2:
      return '本月已经过去 ' + sBefore + day.value + sLast + ' 天';
    case 3:
      return '今年已经过去 ' + sBefore + month.value + sLast + ' 个月';
  }
});

const currentProcess = computed(() => (index: number) => {
  switch (index) {
    case 0:
      return Math.ceil((100 / 24) * parseInt(hour.value));
    case 1:
      return week.value === '0' ? 100 : Math.ceil((100 / 7) * parseInt(week.value));
    case 2:
      return Math.ceil((100 / moment().daysInMonth()) * parseInt(day.value));
    case 3:
      return Math.ceil((100 / 12) * parseInt(month.value));
  }
});
</script>

<style scoped>
.countdown {
  width: 24px;
}

.text-style {
  box-sizing: border-box;
  padding: 12px 0 3px 0;
}
</style>
