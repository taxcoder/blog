//@ts-ignore
import { service } from './http';

export const useTag = (base: string = 'api') => {
  const tags = async () => {
    return await service.get(`/${base}/tags`);
  };

  return { tags };
};

export const useAuthTag = (base: string = 'auth') => {
  const tagArticles = async (id: number) => {
    return await service.get(`/${base}/tags/article/${id}`);
  };

  const tagUpdate = async (id: number, name: string, articles: number[]) => {
    let form: FormData = new FormData();
    form.append('name', name);
    form.append('articles', JSON.stringify(articles));
    return await service.put(`/${base}/tag/update/${id}`, form);
  };

  return { tagArticles, tagUpdate };
};