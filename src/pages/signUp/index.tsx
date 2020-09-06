import React from 'react';
import { history } from 'umi';
import { LoginFormProps } from '@/const';
import { getMemberSignUpFormProps, getAdminSignUpFormProps } from '@/utils';
import { useGetLanguage } from '@/utils/hooks';

import LoginForm from '@/components/LoginForm';

export default function SignUp(): React.ReactNode {
  const isLoaded: boolean = useGetLanguage();

  if (isLoaded) {
    const { type, mode, verify } = history.location.query;

    let props: LoginFormProps | null = null;

    if (type === 'member') {
      props = getMemberSignUpFormProps(mode, !!verify);
    } else if (type === 'admin') {
      props = getAdminSignUpFormProps();
    }

    return props && <LoginForm {...props} />;
  }

  return null;
}
