import React from 'react';
import { history } from 'umi';
import { LoginFormProps } from '@/const';
import { getMemberSignUpFormProps, getAdminSignUpFormProps } from '@/utils';

import GetData from '@/components/GetData'
import LoginForm from '@/components/LoginForm';

function SignUp(): React.ReactNode {
  const { type, mode, verify } = history.location.query;

  let props: LoginFormProps | null = null;

  if (type === 'member') {
    props = getMemberSignUpFormProps(mode, !!verify);
  } else if (type === 'admin') {
    props = getAdminSignUpFormProps();
  }

  return props && <LoginForm {...props} />;
}

export default GetData(SignUp)
