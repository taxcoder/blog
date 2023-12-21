import { service } from './http';

//@ts-ignore
export const useClassification = (base: string = 'api') => {
  return {};
};

export const useAuthClassification = (base: string = 'auth') => {
  const classificationLimit = async (current: number, size: number) => {
    return await service.get(`/${base}/classification/limit?current=${current}&size=${size}`);
  };

  const classificationUpdateName = async (id: number, inputValue: string) => {
    let form = new FormData();
    form.append('name', inputValue);
    return await service.put(`/${base}/classification/update/name/${id}`, form);
  };

  const classificationDelete = async (id: number, newArticlesClassification: { key: number; articleId: number }[]) => {
    return await service.delete(`/${base}/classification/delete/${id}`, {
      data: newArticlesClassification,
    });
  };

  const classificationAll = async () => {
    return await service.get(`/${base}/classification/all`);
  };

  const classificationAdd = async (name: string) => {
    return await service.post(`/${base}/classification/add/${name}`);
  };

  return { classificationLimit, classificationUpdateName, classificationDelete, classificationAll, classificationAdd };
};
