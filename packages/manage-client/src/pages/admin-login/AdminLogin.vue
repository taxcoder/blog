<template>
  <div id="login" class="h-full w-full flex justify-center items-center select-none">
    <div class="flex lg:max-w-4xl max-w-xl lg:flex-grow">
      <div
        class="lg:bg-white lg:w-1/2 sm:w-100 lg:p-8 lg:py-16 lg:px-12 space-y-7 marlene-rounded-l-lg w-full shadow-sm p-8 marlene-bg-glass-ex"
      >
        <div class="space-y-3.5">
          <p class="mb-2 text-primary text-4xl">登录</p>
          <p class="text-blue-gray">每一次登录都是与你の邂逅。</p>
        </div>
        <a-form class="space-y-8 w-auto">
          <div class="space-y-6">
            <a-form-item>
              <div class="block">
                <a-input
                  placeholder="账号名"
                  v-model:value="email"
                  class="min-w-full p-1 pl-2 h-12 rounded-lg"
                  autocomplete
                />
              </div>
            </a-form-item>
            <a-form-item>
              <div class="block rounded-lg border-slate-400">
                <a-input-password
                  placeholder="密码"
                  v-model:value="password"
                  class="min-w-full p-1 pl-2 h-12 rounded-lg"
                  autocomplete
                >
                  <template #iconRender="v">
                    <EyeTwoTone v-if="v" style="margin-right: 10px"></EyeTwoTone>
                    <EyeInvisibleOutlined v-else style="margin-right: 10px"></EyeInvisibleOutlined>
                  </template>
                </a-input-password>
              </div>
            </a-form-item>
            <div class="grid grid-cols-7 gap-4 items-center">
              <div class="col-start-1 col-end-4">
                <label class="flex items-center space-x-3">
                  <a-checkbox v-model:checked="checked" class="check">
                    <span class="text-[#f56692] font-medium">记住密码</span>
                  </a-checkbox>
                </label>
              </div>
              <div class="col-end-8 col-span-3 text-right">
                <a class="text-[#f56692]" href="">忘记密码</a>
              </div>
            </div>
          </div>
          <div class="block text-center rounded-lg hover:shadow-[0px_0px_10px_0px_rgb(204,204,204)] transition-shadow">
            <button
              @click.prevent="onSubmit"
              class="border-none border-transparent cursor-pointer tracking-widest bg-primary min-w-full h-12 focus:bg-secondary text-white rounded-lg text-2xl marlene-btn"
            >
              登 录
            </button>
          </div>
        </a-form>
      </div>
      <div class="lg:w-1/2 marlene-bg-glass rounded-r-lg invisible lg:visible w-0">
        <div>
          <img :src="icon" alt="" class="-mt-20 w-10/12 ml-8" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import icon from '@/assets/image/202109080857232.png';
import { messageError, messageSuccess, messageWarning } from '@/config/message';
import { useAuthWebStation, useLogin } from '@tanxiang/apis';
import { useBaseStore } from '@/stores/base';
import { useRouter } from 'vue-router';

import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons-vue';

const checked = ref<boolean>(false);
const email = ref<string>('');
const password = ref<string>('');

const auth = useAuthWebStation();

const router = useRouter();
const base = useBaseStore();

const onSubmit = () => {
  if (!email.value) {
    return messageWarning('账号名不能为空!');
  } else if (!password.value) {
    return messageWarning('密码不能为空!');
  } else if (!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/.test(email.value)) {
    return messageWarning('账号格式错误！');
  }

  useLogin()
    .login({ email: email.value, password: password.value, remember: checked.value })
    .then((success: any) => {
      messageSuccess(success.message);
      setTimeout(() => {
        localStorage.setItem('token', success.data);
        base.setIsLogin(success.data);
        base.setIsSuccess(true);
        router.replace('/');
      }, 1000);
    })
    .catch((error: any) => messageError(!error || error.name ? '网络错误！' : error));
};
</script>

<style>
.check .ant-checkbox .ant-checkbox-inner:after {
  top: 45%;
}
</style>