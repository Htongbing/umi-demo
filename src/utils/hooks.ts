import { useState, useEffect } from 'react';
import { UDBParams } from '@/const';
import {
  getMemberInitConfig,
  getAdminInitConfig,
  getLoginInitConfig,
  getInviteSignUpInitConfig,
  getBindEmailInitConfig,
  getBindPhoneInitConfig,
  getChangePasswordInitConfig,
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

export const useInit: () => [boolean, UDBParams] = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [reqData, setReqData] = useState<UDBParams>({});
  const {
    type,
    appid,
    subappid,
    mode,
    verify,
    token,
    uid,
    ticket,
  } = history.location.query;
  const { pathname } = history.location;

  let getInitConfig: (params: UDBParams) => Promise<any>;

  let loginType: string;

  let isverify: '0' | '1';

  let ticketType: '1';

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
    if (uid) {
      getInitConfig = getChangePasswordInitConfig;
      ticketType = '1';
    } else {
      getInitConfig = () => Promise.resolve();
    }
  } else if (pathname === '/invite') {
    if (type === 'admin' || type === 'dash') {
      getInitConfig = getInviteSignUpInitConfig;
    }
  } else if (pathname === '/change' && type === 'member') {
    if (mode === 'email') {
      getInitConfig = getBindEmailInitConfig;
    } else if (mode === 'phone') {
      getInitConfig = getBindPhoneInitConfig;
    }
    ticketType = '1';
  }

  useEffect(() => {
    getInitConfig?.({
      appid,
      subappid,
      callback: 'js',
      type: loginType,
      isverify,
      token,
      uid,
      ticket,
      ticketType,
    }).then((data: any): void => {
      setReqData({
        appid,
        subappid,
        stoken: data?.stoken,
        servcode: data?.data?.servcode,
      });
      setIsLoaded(true);
    });
  }, []);

  return [isLoaded, reqData];
};
