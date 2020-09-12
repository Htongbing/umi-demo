import React from 'react';
import { GetDataComponentProps, LoginFormProps } from '@/const';
import { getMemberSignUpFormProps, getAdminSignUpFormProps } from '@/utils';

import GetData from '@/components/GetData';
import LoginForm from '@/components/LoginForm';

function SignUp({ params, history }: GetDataComponentProps): React.ReactNode {
  const { type, mode, verify } = history.location.query;

  let props: LoginFormProps | null = null;

  if (type === 'member') {
    props = getMemberSignUpFormProps(mode, !!verify, params);
  } else if (type === 'admin') {
    props = getAdminSignUpFormProps(params);
  }

  return props && <LoginForm {...props} />;
}

export default GetData(SignUp);
