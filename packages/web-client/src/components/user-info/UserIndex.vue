<template>
  <div id="user-info" v-show="props.show">
    <div class="user-info-container">
      <div class="user-info-content">
        <user-info />
        <web-site-board />
        <life-process />
        <web-site-info />
        <web-site-tag />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import WebSiteBoard from '@/components/user-info/WebSiteBoard.vue';

const height = ref<number>(0);

const props = defineProps({
  show: { type: Boolean, required: true },
});

const emit = defineEmits(['user-height']);

onMounted(() => {
  height.value = document.getElementById('user-info').clientHeight;
  emit('user-height', height.value);
});
</script>

<style scoped>
#user-info {
  width: 100%;
  min-width: var(--user-info);
}

#user-info .user-info-container {
  height: 100%;
  box-sizing: border-box;
}

#list.user-left #user-info .user-info-container {
  padding-right: var(--user-info-padding);
}

#list.user-right #user-info .user-info-container {
  padding-left: var(--user-info-padding);
}

#user-info .user-info-container .user-info-content {
  width: 100%;
  height: 100%;
  padding: 0;
}
</style>