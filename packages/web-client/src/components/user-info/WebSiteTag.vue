<template>
  <user-container :isDefer="true" :loading="loading">
    <template #title>
      <img alt="倒计时" class="tags" src="@/assets/images/tags.png" />
      <span class="tag-name">文章标签</span>
    </template>
    <template #content>
      <el-button plain :type="randomType()" v-for="tag in sortTags" :key="tag.id" class="tag-item">
        {{ tag.name }}
      </el-button>
    </template>
  </user-container>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';

const loading = ref<boolean>(true);

setTimeout(() => (loading.value = false), 2000);

const type = ['primary', 'success', 'warning', 'danger', 'info'];
const tags = reactive([
  {
    id: 6650,
    name: 'Christina Bernhard',
  },
  {
    id: 36601,
    name: 'Olive Hyatt PhD',
  },
  {
    id: 77521,
    name: 'Marian Hahn',
  },
  {
    id: 74613,
    name: 'Miranda Gerlach',
  },
  {
    id: 63853,
    name: 'Richard Flatley MD',
  },
  {
    id: 70962,
    name: 'Mr. Noah Konopelski',
  },
  {
    id: 29927,
    name: 'Lorraine Hessel',
  },
  {
    id: 34340,
    name: 'Mamie Abbott',
  },
  {
    id: 79706,
    name: 'Tracy Schaefer',
  },
  {
    id: 71469,
    name: 'Karl Quigley',
  },
  {
    id: 39726,
    name: 'Douglas Moore Sr.',
  },
  {
    id: 59482,
    name: 'Agnes Parker',
  },
  {
    id: 2100,
    name: 'Tyler Wehner',
  },
  {
    id: 14782,
    name: 'Aaron Schmeler',
  },
  {
    id: 23014,
    name: 'Cecilia Prosacco',
  },
]);

const randomType = () => type[Math.round(Math.random() * 4)];

const sortTags = computed(() => tags.sort((a, b) => (a.name.length - b.name.length > 0 ? 1 : -1)));
</script>

<style scoped>
.tag-name {
  font-size: 1.05rem;
  line-height: 30px;
  text-align: right;
  font-family: 'HarmonyOS', sans-serif;
  margin-right: 5px;
}

.tags {
  width: 22px;
}

.tag-item {
  margin-top: 7px !important;
  margin-right: 7px !important;
  padding: 8px;
}
</style>