import { useState, useEffect } from 'react';
import { LANGUAGE_KEY } from '@/const';
import { getInitConfig } from '@/service/udb'

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
    getInitConfig()
      .then(data => {
        Object.assign(LANGUAGE_KEY, data)
        setIsLoaded(true);
      })
  }, []);

  return isLoaded;
};
