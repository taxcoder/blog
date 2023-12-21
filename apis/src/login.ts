import md5 from 'js-md5';
import { service } from './http.js';

import { salt } from '../index';

const useLogin = () => {
  const login = async (user: { email: string; password: string; remember: boolean }) => {
    //@ts-ignore
    user.password = md5(salt + user.password);
    return await service.post('/api/login', user);
  };

  const logout = async (email: string) => {
    return await service.post(`/auth/logout/${email}`);
  };

  return { login, logout };
};

export { useLogin };
