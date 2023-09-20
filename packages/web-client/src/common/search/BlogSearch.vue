<template>
  <div id="blog-search">
    <el-scrollbar height="100%" wrap-class="warp" :always="true">
      <el-card
        class="search-card"
        shadow="never"
        v-for="value in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]"
        :key="value"
      >
        {{ value }}
      </el-card>
    </el-scrollbar>
  </div>
</template>

<script setup></script>

<style scoped>
#blog-search {
  padding: 20px 0;
  height: calc(100% - var(--el-component-size-large) - 30px);
  overflow: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

#blog-search::-webkit-scrollbar {
  display: none;
}

.search-card {
  border: none;
  padding: 0 15px;
}
</style>

<style>
.warp ~ .is-vertical > div {
  background-color: #828282;
  opacity: 0.5;
  width: 5px;
}

.search-message-box .el-message-box__content {
  height: calc(100% - 53px);
  padding-left: 0 !important;
  padding-right: 0 !important;
}

.search-message-box .el-message-box__content .el-message-box__container,
.search-message-box .el-message-box__content .el-message-box__container .el-message-box__message {
  height: 100%;
}
</style>
