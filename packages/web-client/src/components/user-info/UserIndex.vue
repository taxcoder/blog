<template>
  <div id="user-info" v-show="show">
    <div class="user-info-container">
      <div class="user-info-content" v-if="showUserInfo">
        <user-info />
        <web-site-board />
        <life-process />
        <web-site-info />
        <web-site-tag />
      </div>
      <div class="user-info-content" v-else>
        <article-directory />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import UserInfo from '@/components/user-info/UserInfo.vue';
import WebSiteBoard from '@/components/user-info/WebSiteBoard.vue';
import LifeProcess from '@/components/user-info/LifeProcess.vue';
import WebSiteInfo from '@/components/user-info/WebSiteInfo.vue';
import WebSiteTag from '@/components/user-info/WebSiteTag.vue';
import ArticleDirectory from '@/components/user-info/ArticleDirectory.vue';

const height = ref<number>(0);

const props = defineProps({
  show: { type: Boolean, required: true },
  showUserInfo: { type: Boolean, required: true },
});
</script>

<style scoped>
#user-info {
  width: 100%;
  height: 100%;
  min-width: var(--user-info);
}

#user-info .user-info-container {
  height: 100%;
  box-sizing: border-box;
  padding-top: 15px;
}

#list .user-left .user-info-container {
  padding-right: 15px;
  padding-left: 30px;
}

#list .user-right .user-info-container {
  padding-right: 30px;
  padding-left: 15px;
}

#user-info .user-info-container .user-info-content {
  width: 100%;
  height: 100%;
  padding: 0;
}
</style>
