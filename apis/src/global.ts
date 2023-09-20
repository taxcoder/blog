import { service, GlobalAxios } from './http.ts';

const web = async (base: string) => {
  return await service.get(`/${base}/init`);
};

const text = async (base: string) => {
  return await service.get(`/${base}/text`);
};

const count = async (base: string) => {
  return await service.get(`/${base}/count`);
};

const init = (base: string = 'api') => {
  return GlobalAxios.all([web(base), text(base), count(base)]).then((success) => {
    let web = success[0].data;
    web['text'] = success[1].data;
    web['count'] = success[2].data;
    return new Promise((resolve) => {
      resolve(web);
    });
  });
};

export { init };