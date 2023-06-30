<template>
  <div id="pendant">
    <transition name="slide-fade">
      <div class="button-menu-item" v-show="flag && exceedHeight">
        <transition name="slide-fade">
          <el-button
            :dark="true"
            type="primary"
            class="side-button"
            tag="div"
            @click="changeOpenActive()"
            v-show="isActive"
          >
            <template v-slot:icon>
              <n-icon size="23">
                <ArrowsDiagonalMinimize2 style="transform: rotateZ(45deg)" v-if="openActive" />
                <ArrowFit16Filled v-else />
              </n-icon>
            </template>
          </el-button>
        </transition>
        <el-button type="primary" class="side-button" tag="div" @click="changeTheme">
          <template v-slot:icon>
            <n-icon size="22">
              <DarkTheme20Filled />
            </n-icon>
          </template>
        </el-button>
      </div>
    </transition>
    <transition name="slide-fade">
      <div class="button-menu" v-show="exceedHeight">
        <el-button type="primary" class="side-button" tag="div" @click="isMenuItemActive()">
          <template v-slot:icon>
            <n-icon size="18" class="setting-button">
              <SettingsSharp />
            </n-icon>
          </template>
        </el-button>
        <el-button type="primary" class="side-button" tag="div" @click="returnTop()">
          <template v-slot:icon>
            <n-icon size="23">
              <ArrowUpOutline />
            </n-icon>
          </template>
        </el-button>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { inject } from 'vue';
import { ArrowUpOutline, SettingsSharp } from '@vicons/ionicons5';
import { ArrowFit16Filled, DarkTheme20Filled } from '@vicons/fluent';
import { ArrowsDiagonalMinimize2 } from '@vicons/tabler';

import { useBaseStore } from '@/stores/base';

const base = useBaseStore();

const scrollBar = inject('scrollBar');
const screenWidth = inject('screenWidth');
const screenHeight = inject('screenHeight');
const scrollStatus = inject('scrollStatus');

const flag = ref(false);
const openActive = ref(base.getOpenActive);
const isMenuItemActive = () => {
  flag.value = !flag.value;
};

const changeOpenActive = () => {
  openActive.value = !openActive.value;
  base.setOpenActive(openActive.value);
  base.setOpenUserActive(!base.getOpenUserActive);
};

const returnTop = () => {
  scrollBar.value.scrollTo(0);
  flag.value = false;
};

const changeTheme = () => {
  base.setTheme(!base.getTheme);
};

const isActive = computed(() => {
  let ret = screenWidth.value > 1200;
  openActive.value = ret && base.getOpenUserActive;
  base.setOpenActive(openActive.value);
  return ret;
});

const exceedHeight = computed(() => {
  return scrollStatus.current >= screenHeight.value / 2;
});
</script>

<style scoped>
@import '@/styles/dark.css';

#pendant {
  position: absolute;
  right: 17px;
  bottom: 40px;
  display: flex;
  flex-direction: column;
  align-items: end;
  z-index: 13;
}

.button-menu,
.button-menu-item {
  display: flex;
  flex-direction: column;
  align-items: end;
}

.side-button {
  width: 35px;
  height: 35px;
  border-radius: 5px;
  margin-bottom: 5px !important;
  border: none;
}

.setting-button {
  animation: turn 1.5s linear infinite forwards;
}

.side-button:hover {
  border: none;
  background-color: #ff7242;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: transform 0.5s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(200px);
}

@keyframes turn {
  0% {
    transform: rotateZ(0);
  }
  100% {
    transform: rotateZ(360deg);
  }
}
</style>