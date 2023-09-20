<template>
  <a-drawer :open="base.getOpen" placement="left" :width="Data.siderWidth" :closable="false" @close="close"></a-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { useBaseStore } from '@/stores/base';

import { Data } from '@/config';

const open = ref<boolean>(false);

const base: any = useBaseStore();

const close = () => base.setOpen(false);
</script>

<style scoped></style>