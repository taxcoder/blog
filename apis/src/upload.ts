import { service } from './http';

export const useUpload = (base: string = 'auth') => {
  const uploadHead = async (file: any) => {
    const form = new FormData();
    form.append(
      'file',
      base64toBlob(file.split(',')[1], file.split(',')[0].replace('data:', '').replace(';base64', ''))
    );
    return service.post(`/${base}/upload/head`, form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  };

  const uploadBackground = async (file: any) => {
    const form = new FormData();
    form.append(
      'file',
      base64toBlob(file.split(',')[1], file.split(',')[0].replace('data:', '').replace(';base64', ''))
    );
    return service.post(`/${base}/upload/background`, form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  };

  const uploadArticleImage = async (file: any) => {
    const form = new FormData();
    form.append('file', file);
    return await service.post(`/${base}/upload/image/article`, form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  };

  const uploadEssayImage = async (file: any) => {
    const form = new FormData();
    form.append('file', file);
    return await service.post(`/${base}/upload/image/essay`, form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  };

  return { uploadHead, uploadBackground, uploadArticleImage, uploadEssayImage };
};

const base64toBlob = (base64: string, type: string = 'application/octet-stream') => {
  const str = atob(base64);
  let n = str.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = str.charCodeAt(n);
  }
  return new Blob([u8arr], { type });
};
