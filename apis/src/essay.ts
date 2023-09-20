import { service } from './http';

export const useEssay = (base: string = 'api') => {
  const essayList = async (current: number, size: number) => {
    return await service.get(`/${base}/essay?current=${current}&size=${size}`);
  };

  const essayAddLike = async (id: number) => {
    return await service.get(`/${base}/essay/like/${id}`);
  };

  return { essayList, essayAddLike };
};