import { useState, useEffect } from 'react';
import { LANGUAGE_KEY } from '@/const';

export const useUpdate: (update: () => void, dependent?: Array<any>) => void = (
  update,
  dependent,
) => {
  const [first, setFirst] = useState<boolean>(true);

  useEffect(() => {
    if (!first) return update();
    setFirst(false);
  }, dependent);
};

export const useGetLanguage: () => boolean = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    new Promise(resolve => setTimeout(resolve, 1000)).then(() => {
      Object.assign(LANGUAGE_KEY, {
        email: '邮箱',
        phone: '手机号',
        username: '邮箱/手机号',
        password: '密码',
        repeatPassword: '再次输入密码',
        code: '验证码',
        signUp: '注册',
        signIn: '登录',
        confirm: '确定',
      });
      setIsLoaded(true);
    });
  }, []);

  return isLoaded;
};
