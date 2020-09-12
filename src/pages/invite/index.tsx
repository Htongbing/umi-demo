import React from 'react';
import { history } from 'umi';
import { LoginFormProps } from '@/const';
import { getAdminInviteFormProps } from '@/utils';

import GetData from '@/components/GetData';
import LoginForm from '@/components/LoginForm';

function Invite({ data }: Record<string, any>): React.ReactNode {
  const { type } = history.location.query;

  let props: LoginFormProps | null = null;

  if (type === 'admin' || type === 'dash') {
    props = getAdminInviteFormProps(data);
  }

  return props && <LoginForm {...props} />;
}

export default GetData(Invite);
