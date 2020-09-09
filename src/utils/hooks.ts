import { useState, useEffect } from 'react';
import { LANGUAGE_KEY, UDBParams, Obj } from '@/const';
import { getMemberInitConfig, getAdminInitConfig } from '@/service/udb'
import { history } from 'umi'

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
  const [reqData, setReqData] = useState<Obj>({})
  const { type, appid, subappid } = history.location.query

  let getInitConfig: (params: UDBParams) => Promise<void>

  if (type === 'member') {
    getInitConfig = getMemberInitConfig
  } else if (type === 'admin') {
    getInitConfig = getAdminInitConfig
  }

  useEffect(() => {
    getInitConfig?.({
      appid,
      subappid,
      callback: 'js'
    })
      .then((data: any): void => {
        setReqData(data)
        setIsLoaded(true);
      })
  }, []);

  return [isLoaded, reqData];
};
