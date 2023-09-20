import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
//@ts-ignore
import base from './env';

const service: AxiosInstance = axios.create({
  //@ts-ignore
  baseURL: base.BASE_URL,
  timeout: base.TIME_OUT, // 请求超时时间
  withCredentials: true,
});

// request拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error) => {
    return error;
  }
);

// response 拦截器
service.interceptors.response.use(
  (response: AxiosResponse | any) => {
    if (response.status === 200 && response.data.status === 200) return response.data.data;
    return Promise.reject(response.data ? response.data.message : null);
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export { service, axios as GlobalAxios };