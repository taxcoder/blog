<!--
 * @Author: tanxiang 1571922819@qq.com
 * @Date: 2023-09-09 12:36:08
 * @Description:
 * @LastEditTime: 2023-12-03 16:42:24
 * @LastEditors: tanxiang 1571922819@qq.com
 * @FilePath: \blog\common\src\components\global-loading\GlobalLoading.vue
 * @copyright: Copyright (c) 2023 by 1571922819@qq.com, All Rights Reserved.
-->
<template>
  <div class="loader"></div>
</template>

<script setup lang="ts"></script>

<style scoped lang="css">
.loader {
  width: 35px;
  height: 80px;
  position: relative;
}

.loader::after {
  content: '';
  position: absolute;
  inset: 0;
  padding: 3px 5px;
  border-top: 1px solid #bbb6aa;
  border-bottom: 4px solid #bbb6aa;
  background: linear-gradient(#612329 0 0) bottom no-repeat content-box, #e4e0d7;
  mix-blend-mode: darken;
  animation: loading 1.5s infinite linear;
}
.loader::before {
  content: '';
  position: absolute;
  inset: -18px calc(50% - 2px) 8px;
  background: #eb6b3e;
  transform-origin: bottom;
  transform: rotate(8deg);
}

@keyframes loading {
  0% {
    background-size: 100% 100%;
  }
  100% {
    background-size: 100% 5%;
  }
}
</style>
