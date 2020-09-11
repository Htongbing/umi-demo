import { useState, useEffect } from 'react';
import { UDBParams, Obj } from '@/const';
import {
  getMemberInitConfig,
  getAdminInitConfig,
  getLoginInitConfig,
} from '@/service/udb';
import { history } from 'umi';

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

export const useInit: () => [boolean, Obj] = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [reqData, setReqData] = useState<Obj>({});
  const { type, appid, subappid, mode, verify } = history.location.query;
  const { pathname } = history.location;

  let getInitConfig: (params: UDBParams) => Promise<void>;

  let loginType: string;

  let isverify: '0' | '1';

  if (pathname === '/signIn') {
    getInitConfig = getLoginInitConfig;
    loginType = 'email';
    if (type === 'member' && mode !== 'email') {
      loginType = 'acct';
    }
  } else if (pathname === '/signUp') {
    if (type === 'member') {
      getInitConfig = getMemberInitConfig;
      isverify = verify ? '1' : '0';
    } else if (type === 'admin') {
      getInitConfig = getAdminInitConfig;
    }
  } else if (pathname === '/reset') {
    getInitConfig = () => Promise.resolve();
  }

  useEffect(() => {
    getInitConfig?.({
      appid,
      subappid,
      callback: 'js',
      type: loginType,
      isverify,
    }).then((data: any): void => {
      setReqData({
        appid,
        subappid,
        stoken: data?.stoken,
      });
      setIsLoaded(true);
    });
  }, []);

  return [isLoaded, reqData];
};
