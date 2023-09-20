<template>
  <svg aria-hidden="true" :style="iconStyle">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script setup lang="ts">
const props = defineProps({
  size: { type: Number, default: 20 },
  iconClass: { type: String, default: '' },
  left: { type: Number, default: 0 },
  top: { type: Number, default: 0 },
  padding: { type: String, default: '0' },
});

const iconName = computed(() => {
  return '#' + props.iconClass;
});

const iconStyle = computed(() => {
  return {
    width: props.size + 'px',
    height: '100%',
    position: 'relative',
    left: props.left + 'px',
    top: props.top + 'px',
    padding: props.padding,
  };
});
</script>

<style scoped></style>
