import React from 'react';
import { history } from 'umi';
import { LoginFormProps } from '@/const';
import {
  getMemberSignInFormProps,
  getAdminSignInFormProps,
  getDashSignInFormProps,
} from '@/utils';

import LoginForm from '@/components/LoginForm';

export default function SignIn(): React.ReactNode {
  const { type, mode } = history.location.query;

  let props: LoginFormProps | null = null;

  if (type === 'member') {
    props = getMemberSignInFormProps(mode);
  } else if (type === 'admin') {
    props = getAdminSignInFormProps();
  } else if (type === 'dash') {
    props = getDashSignInFormProps();
  }

  return props && <LoginForm {...props} />;
}
