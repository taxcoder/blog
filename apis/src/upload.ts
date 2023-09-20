import { service } from './http';

export const useUpload = (base: string = 'auth') => {
  const uploadHead = (url: string) => {
    urlToBase64(url).then((blob: any) => {
      let form: FormData = new FormData();
      form.append('file', blob);
      service
        .post(`/${base}/upload/head`, form, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((r) => console.log(r));
    });
  };

  return { uploadHead };
};

function urlToBase64(url: string) {
  return new Promise((resolve) => {
    fetch(url).then((data) => resolve(data.blob()));
  });
}