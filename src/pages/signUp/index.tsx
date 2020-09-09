import React from 'react';
import { history } from 'umi';
import { LoginFormProps, UDBParams } from '@/const';
import { getMemberSignUpFormProps, getAdminSignUpFormProps } from '@/utils';

import GetData from '@/components/GetData'
import LoginForm from '@/components/LoginForm';

function SignUp({ data }: Record<string, any>): React.ReactNode {
  const { type, mode, verify, appid, subappid } = history.location.query;

  let props: LoginFormProps | null = null;

  const params: UDBParams = {
    appid,
    subappid,
    stoken: data?.stoken
  }

  if (type === 'member') {
    props = getMemberSignUpFormProps(mode, !!verify, params);
  } else if (type === 'admin') {
    props = getAdminSignUpFormProps(params);
  }

  return props && <LoginForm {...props} />;
}

export default GetData(SignUp)
