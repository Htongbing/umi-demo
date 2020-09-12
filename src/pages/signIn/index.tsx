import React from 'react';
import { GetDataComponentProps, LoginFormProps, LOGIN_TYPE } from '@/const';
import { getSignInFormProps } from '@/utils';

import LoginForm from '@/components/LoginForm';
import GetData from '@/components/GetData';

function SignIn({ params, history }: GetDataComponentProps): React.ReactNode {
  const { type, mode } = history.location.query;

  let props: LoginFormProps | null = null;

  if (LOGIN_TYPE.includes(type)) {
    props = getSignInFormProps(mode || 'email', params);
  }

  return props && <LoginForm {...props} />;
}

export default GetData(SignIn);
