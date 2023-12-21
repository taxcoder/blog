import { ElMessage } from 'element-plus';

const time: number = 2000;

const useMessage = () => {
  const successMessage = (message: string, timeout: number = 0, fn?: Function) => {
    setTimeout((): void => {
      ElMessage({
        message: message,
        type: 'success',
        duration: time,
      });
    }, timeout);
    setTimeout(fn, timeout + time);
  };
  const warningMessage = (message: string, timeout: number = 0, fn?: Function) => {
    setTimeout((): void => {
      ElMessage({
        message: message,
        type: 'warning',
        duration: time,
      });
    }, timeout);
    setTimeout(fn, timeout + time);
  };

  const errorMessage = (message: string, timeout: number = 0, fn?: Function) => {
    setTimeout((): void => {
      ElMessage({
        message: message,
        type: 'error',
        duration: time,
      });
    }, timeout);

    setTimeout(fn, timeout + time);
  };

  return { successMessage, warningMessage, errorMessage };
};

export default useMessage;
