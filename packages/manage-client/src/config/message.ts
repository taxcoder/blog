import { message } from 'ant-design-vue';

const messageDuration: number = 0.75;

export const messageSuccess = (msg: string, duration: number = messageDuration) => {
  message.success(msg, duration);
};

export const messageError = (msg: string, duration: number = messageDuration) => {
  message.error(msg, duration);
};

export const messageWarning = (msg: string, duration: number = messageDuration) => {
  message.warning(msg, duration);
};

export const messageLoading = (msg: string) => {
  message.loading(msg, 0);
};
