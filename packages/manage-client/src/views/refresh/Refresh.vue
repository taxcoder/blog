<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

onMounted(() => {
  let prev = router.getRoutes().filter((r: any) => r.meta.key === route.query.f)[0];
  if (!prev) return;
  router.replace(prev.path);
});
</script>

<template></template>

<style scoped></style>