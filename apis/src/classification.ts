import { service } from './http';

export const useClassification = (base: string = 'api') => {
  const classificationArticle = async (current: number, size: number, id: number) => {
    return await service.get(`/${base}/classificationArticle/${id}?current=${current}&size=${size}`);
  };
  return { classificationArticle };
};