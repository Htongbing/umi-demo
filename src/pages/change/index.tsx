import React from 'react';
import { LoginFormProps, GetDataComponentProps } from '@/const';
import { getMemberChangeFormProps, getChangeFormProps } from '@/utils';

import LoginForm from '@/components/LoginForm';
import GetData from '@/components/GetData';

function Change({
  isVerify,
  changeVerify,
  history,
  params,
}: GetDataComponentProps): React.ReactNode {
  const { type, mode } = history.location.query;

  let props: LoginFormProps | null = null;

  if (type === 'member' && ['email', 'phone'].includes(mode)) {
    props = getMemberChangeFormProps(params, () => changeVerify());
  }

  props && isVerify && Object.assign(props, getChangeFormProps(params, mode));

  return props && <LoginForm {...props} />;
}

export default GetData(Change);
