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

export const useGetLanguage: () => [boolean, Obj] = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [reqData, setReqData] = useState<Obj>({});
  const { type, appid, subappid, mode } = history.location.query;
  const { pathname } = history.location;

  let getInitConfig: (params: UDBParams) => Promise<void>;

  let loginType: string;

  if (pathname === '/signIn') {
    getInitConfig = getLoginInitConfig;
    loginType = 'email';
    if (type === 'member' && mode !== 'email') {
      loginType = 'acct';
    }
  } else if (type === 'member') {
    getInitConfig = getMemberInitConfig;
  } else if (type === 'admin') {
    getInitConfig = getAdminInitConfig;
  }

  useEffect(() => {
    getInitConfig?.({
      appid,
      subappid,
      callback: 'js',
      type: loginType,
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
