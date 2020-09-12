import React from 'react';
import { GetDataComponentProps, LoginFormProps } from '@/const';
import { getInviteFormProps } from '@/utils';

import GetData from '@/components/GetData';
import LoginForm from '@/components/LoginForm';

function Invite({ params, history }: GetDataComponentProps): React.ReactNode {
  const { type } = history.location.query;

  let props: LoginFormProps | null = null;

  if (type === 'admin' || type === 'dash') {
    props = getInviteFormProps(params);
  }

  return props && <LoginForm {...props} />;
}

export default GetData(Invite);
