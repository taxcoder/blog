<template>
  <div
    id="flipDown"
    @click="flipDown"
    @mouseover="hover = true"
    @mouseleave="hover = false"
    :style="[
      styles,
      hideFlipDown,
      { '--bottom': bottom + 'px' },
      { 'animation-play-state': hover ? 'paused' : 'running' },
    ]"
  >
    <i class="iconfont icon-arrow-up" id="img-down"></i>
  </div>
</template>

<script lang="ts">
/**
 * @author: tanxiang
 *
 * @projectName: client-blog
 * @createTime: 2022/10/16 15:22
 * @description:
 */

import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'FlipDown',
  setup() {
    let hover = ref<boolean>(false);
    let windowHeight = ref<number>(document.documentElement.clientHeight);
    return { windowHeight, hover };
  },
  props: {
    to: { type: String, default: '' },
    theme: { type: Boolean, default: true },
    bottom: { type: Number, default: 30 },
    size: { type: Number, default: 24 },
    scrollTop: { type: Number, default: -1 },
    hideHeight: { type: Number, default: -1 },
    styles: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  mounted() {
    window.addEventListener('resize', (event: any) => {
      this.windowHeight = event.currentTarget.innerHeight;
    });
  },
  methods: {
    flipDown() {
      // 判断获取的数据是否不为null
      if (this.getBlogHomeCenter) this.getBlogHomeCenter.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },
  },
  computed: {
    getBlogHomeCenter() {
      // 获取可视页面高度
      return document.getElementById(this.to);
    },
    hideFlipDown() {
      // 当隐藏高度没有传入时，就根据可视窗口高度的四分之一来进行隐藏
      let hide = this.hideHeight === -1;
      let flag = hide ? this.scrollTop >= this.windowHeight / 4 : this.scrollTop > this.hideHeight;
      return { display: flag ? 'none' : 'block' };
    },
  },
});
</script>

<style scoped lang="css">
:root {
  --bottom: 0;
}

#flipDown {
  bottom: var(--bottom);
  position: absolute;
  z-index: 10;
  left: 49%;
  animation: swing 1.5s infinite linear;
  animation-direction: alternate;
  animation-timing-function: ease-out;
}

#img-down {
  -webkit-filter: none;
  filter: none;
  font-size: 3rem;
  color: white;
  transform: rotateZ(180deg);
  border-radius: 50%;
}

@keyframes swing {
  0% {
    bottom: var(--bottom);
    opacity: 0.3;
  }
  100% {
    bottom: calc(var(--bottom) + 10px);
    opacity: 1;
  }
}
</style>