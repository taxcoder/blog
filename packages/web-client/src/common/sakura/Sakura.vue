<template>
  <div class="Sakura">
    <canvas id="canvas_sakura" ref="canvas_sakura" :style="{ zIndex: zIndex }"></canvas>
  </div>
</template>

<script>
import sakuraImg from '@/assets/images/sakura.png';

import { Sakura, SakuraList } from './sakura.js';

export default {
  name: 'Sakura',
  data() {
    return {
      staticStatus: false,
      stop: null,
      num: 15,
      show: true,
      zIndex: 999,
      width: 0,
    };
  },
  mounted() {
    this.$nextTick(() => {
      if (this.show) {
        this.startSakura();
      }
    });
    addEventListener('resize', function (event) {
      this.width = event.currentTarget.innerWidth;
    });
  },
  methods: {
    getRandom(option) {
      let ret, random;
      switch (option) {
        case 'x':
          ret = Math.random() * window.innerWidth;
          break;
        case 'y':
          ret = Math.random() * window.innerHeight;
          break;
        case 's':
          ret = Math.random();
          break;
        case 'r':
          ret = Math.random() * 6;
          break;
        case 'fnx':
          random = -0.5 + Math.random() * 1;
          ret = function (x, y) {
            return x + 0.5 * random - 1.7;
          };
          break;
        case 'fny':
          random = 1.5 + Math.random() * 0.7;
          ret = function (x, y) {
            return y + random;
          };
          break;
        case 'fnr':
          random = Math.random() * 0.03;
          ret = function (r) {
            return r + random;
          };
          break;
      }
      return ret;
    },
    startSakura() {
      let that = this;
      requestAnimationFrame =
        window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        window.oRequestAnimationFrame;
      let canvas = document.getElementById('canvas_sakura');
      this.staticStatus = true;
      this.$refs.canvas_sakura.width = window.innerWidth;
      this.$refs.canvas_sakura.height = window.innerHeight;
      let cxt = this.$refs.canvas_sakura.getContext('2d');
      let sakuraList = new SakuraList();
      const img = new Image();
      img.src = sakuraImg; //樱花效果图相对路径
      for (let i = 0; i < that.num; i++) {
        let sakura, randomX, randomY, randomS, randomR, randomFnx, randomFny, randomFnR;
        randomX = this.getRandom('x');
        randomY = this.getRandom('y');
        randomR = this.getRandom('r');
        randomS = this.getRandom('s');
        randomFnx = this.getRandom('fnx');
        randomFny = this.getRandom('fny');
        randomFnR = this.getRandom('fnr');
        sakura = new Sakura(
          randomX,
          randomY,
          randomS,
          randomR,
          {
            x: randomFnx,
            y: randomFny,
            r: randomFnR,
          },
          this,
          img
        );
        sakura.draw(cxt);
        sakuraList.push(sakura);
      }
      this.stop = requestAnimationFrame(function fn() {
        cxt.clearRect(0, 0, canvas.width, canvas.height);
        sakuraList.update();
        sakuraList.draw(cxt);
        that.stop = requestAnimationFrame(fn);
      });
    },
    sakuraStop() {
      if (this.staticStatus) {
        let child = document.getElementById('canvas_sakura');
        child.parentNode.removeChild(child);
        window.cancelAnimationFrame(this.stop);
        this.staticStatus = false;
      } else {
        this.startSakura();
      }
    },
  },
  watch: {
    width: (newWidth) => {
      console.log(newWidth);
    },
    immediate: true,
    // 开启深度监听 deep
    deep: true,
  },
};
</script>

<style scoped>
#canvas_sakura {
  pointer-events: none;
  position: fixed;
  top: 0;
  left: 0;
}
</style>