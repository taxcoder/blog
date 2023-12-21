import { service } from './http';

export const useEssay = (base: string = 'api') => {
  const essayList = async (current: number, size: number) => {
    return await service.get(`/${base}/essay/limit?current=${current}&size=${size}`);
  };

  const essayAddLike = async (id: number) => {
    return await service.get(`/${base}/essay/update/like/${id}`);
  };

  return { essayList, essayAddLike };
};

export const useAuthEssay = (base: string = 'auth') => {
  const essayById = async (id: number) => {
    return await service.get(`/${base}/essay/${id}`);
  };

  const essayDelete = async (id: number) => {
    return await service.delete(`/${base}/essay/delete/${id}`);
  };

  const essayUpdateContentById = async (id: number, content: string) => {
    return await service.put(`/${base}/essay/update/content/${id}?content=${content}`);
  };

  const essayRecoveryList = async (current: number, size: number) => {
    return await service.get(`/${base}/recovery/essay/limit?current=${current}&size=${size}`);
  };

  const essayRestoreById = async (id: number) => {
    return await service.get(`/${base}/recovery/essay/restore/${id}`);
  };

  const essayRestoreDeleteById = async (id: number) => {
    return await service.get(`/${base}/recovery/essay/delete/${id}`);
  };

  const addEssay = async (content: string, emojiId: string) => {
    return await service.post(`/${base}/essay/add`, { content: content, emojiId: emojiId });
  };

  const essayProvince = async () => {
    return await service.get(`/${base}/essay/province/info`);
  };
  return {
    essayDelete,
    essayById,
    essayUpdateContentById,
    addEssay,
    essayRecoveryList,
    essayRestoreById,
    essayRestoreDeleteById,
    essayProvince,
  };
};