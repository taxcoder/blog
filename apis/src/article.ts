import { service } from './http';

export const useArticle = (base: string = 'api') => {
  const articleList = async (current: number, size: number): Promise<any> => {
    return await service.get(`/${base}/article/list?current=${current}&size=${size}`);
  };

  const archivedList = async (): Promise<any> => {
    return await service.get(`/${base}/archived/list?current`);
  };

  const findArticleIdByUrl = async (id: number): Promise<any> => {
    return await service.get(`/${base}/article/${id}/url`);
  };

  const findArticleIdByInfo = async (id: number): Promise<any> => {
    return await service.get(`/${base}/article/${id}`);
  };

  return { articleList, archivedList, findArticleIdByUrl, findArticleIdByInfo };
};