<template>
  <div id="waves">
    <svg
      class="waves"
      :style="{ bottom: bottom + 'px' }"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 24 150 28"
      preserveAspectRatio="none"
      shape-rendering="auto"
    >
      <defs>
        <path
          id="gentle-wave"
          d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
        ></path>
      </defs>
      <g class="parallax">
        <use
          :style="setUseFillStyle('rgba(253, 253, 253, 0.7)', 'rgba(34,34,34,0.7)')"
          xlink:href="#gentle-wave"
          x="48"
          y="0"
        ></use>
        <use
          :style="setUseFillStyle('rgba(253, 253, 253, 0.5)', 'rgba(34,34,34,0.5)')"
          xlink:href="#gentle-wave"
          x="48"
          y="3"
        ></use>
        <use
          :style="setUseFillStyle('rgba(253, 253, 253, 0.3)', 'rgba(34,34,34,0.3)')"
          xlink:href="#gentle-wave"
          x="48"
          y="5"
        ></use>
        <use
          :style="setUseFillStyle('#ffffff', '#21252b')"
          xlink:href="#gentle-wave"
          x="48"
          y="7"
        ></use>
      </g>
    </svg>
  </div>
</template>

<script lang="ts">
/**
 * @author: tanxiang
 * @projectName: client-blog
 * @createTime: 2022/10/15 14:19
 * @description:
 */

import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FlowingCloud',
  setup() {
    return {};
  },
  props: {
    bottom: {
      type: Number,
      default: 0,
    },
    theme: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    setUseFillStyle(light: string, dark: string) {
      return { fill: this.theme ? dark : light };
    },
  },
});
</script>

<style scoped lang="css">
#waves {
  position: relative;
  top: 1px;
}

.waves {
  width: 100%;
  bottom: 0;
  min-height: 3.125rem;
  max-height: 13rem;
  position: absolute;
  z-index: 4;
  left: 0;
}

.parallax > use {
  -webkit-animation: wave 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
  animation: wave 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
}

.parallax > use:first-child {
  -webkit-animation-delay: -2s;
  animation-delay: -2s;
  -webkit-animation-duration: 7s;
  animation-duration: 7s;
}

.parallax > use:nth-child(2) {
  -webkit-animation-delay: -3s;
  animation-delay: -3s;
  -webkit-animation-duration: 10s;
  animation-duration: 10s;
}

.parallax > use:nth-child(3) {
  -webkit-animation-delay: -4s;
  animation-delay: -4s;
  -webkit-animation-duration: 13s;
  animation-duration: 13s;
}

.parallax > use:nth-child(4) {
  -webkit-animation-delay: -5s;
  animation-delay: -5s;
  -webkit-animation-duration: 20s;
  animation-duration: 20s;
}

@keyframes wave {
  0% {
    transform: translate3d(-90px, 0, 0);
  }
  100% {
    transform: translate3d(85px, 0, 0);
  }
}
</style>
