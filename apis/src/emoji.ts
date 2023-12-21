import { service } from './http';

export const useAuthEmoji = (base: string = 'auth') => {
  const emojiList = async () => {
    return await service.get(`/${base}/emoji/list`);
  };

  return { emojiList };
};