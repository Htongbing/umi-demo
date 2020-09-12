import React from 'react';
import { LoginFormProps, GetDataComponentProps, LOGIN_TYPE } from '@/const';
import { getAccountResetFormProps, getResetFormProps } from '@/utils';

import LoginForm from '@/components/LoginForm';
import GetData from '@/components/GetData';

function Reset({
  isVerify,
  changeVerify,
  params,
  history,
}: GetDataComponentProps): React.ReactNode {
  const { type, mode } = history.location.query;

  let props: LoginFormProps | null = null;

  if (LOGIN_TYPE.includes(type)) {
    props = getAccountResetFormProps(mode || 'email', params, () =>
      changeVerify(),
    );
  }

  props && isVerify && Object.assign(props, getResetFormProps(params));

  return props && <LoginForm {...props} />;
}

export default GetData(Reset);
