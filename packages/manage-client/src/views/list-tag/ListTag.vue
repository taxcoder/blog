<template>
  <div id="tag">
    <list-tag-add />
    <list-tag-table />
  </div>
</template>

<script setup lang="ts">
import ListTagTable from '@/views/list-tag/ListTagTable.vue';
import ListTagAdd from '@/views/list-tag/ListTagAdd.vue';
</script>

<style scoped>
#tag {
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>