import { service } from './http.js';

const useLogin = () => {
  const login = async (user: { email: string; password: string; remember: boolean }) => {
    return await service.post('/api/login', user);
  };

  const logout = async (email: string) => {
    return await service.post('/auth/logout', email);
  };

  return { login };
};

export { useLogin };