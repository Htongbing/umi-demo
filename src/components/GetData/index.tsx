import React, { useState } from 'react';
import { GetDataComponentProps, Obj, UDBParams } from '@/const';
import { useInit } from '@/utils/hooks';
import '@/assets/js/udb.sdk.rsa.js';

function GetData(
  Component: (props: GetDataComponentProps) => React.ReactNode,
): React.ReactNode {
  return (props: Record<string, any>) => {
    const [isLoaded, params]: [boolean, UDBParams] = useInit();
    const [isVerify, setIsVerify] = useState<boolean>(false);

    const changeVerify: () => void = () => setIsVerify(true);

    return isLoaded
      ? Component({ ...props, isVerify, changeVerify, params })
      : null;
  };
}

export default GetData;
