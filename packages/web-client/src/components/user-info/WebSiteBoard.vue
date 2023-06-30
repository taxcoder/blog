<template>
  <user-container>
    <template v-slot:title>
      <img src="@/assets/images/horn.png" alt="通知" class="horn" />
      <span class="bulletin-board">公告栏目</span>
    </template>
    <template v-slot:content>
      <div class="board-content">
        <el-text size="small">暂时没有想说的</el-text>
      </div>
    </template>
  </user-container>
</template>

<script setup lang="ts"></script>

<style scoped>
.horn {
  width: 30px;
}

.bulletin-board {
  font-size: 1.05rem;
  line-height: 30px;
  text-align: right;
  font-family: 'HarmonyOS', sans-serif;
  margin-right: 10px;
}

.board-content {
  width: 100%;
  padding-top: 6px;
  box-sizing: border-box;
  min-height: 75px;
}
</style>