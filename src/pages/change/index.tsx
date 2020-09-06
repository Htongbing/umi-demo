import React, { useState } from 'react';
import { history } from 'umi';
import { LoginFormProps } from '@/const';
import { getMemberChangeFormProps, getChangeFormConfig } from '@/utils';

import LoginForm from '@/components/LoginForm';

export default function Change(): React.ReactNode {
  const { type, mode, userId } = history.location.query;

  const [isVerify, setIsVerify] = useState<boolean>(false);

  let props: LoginFormProps | null = null;

  const onSubmit: () => Promise<void> = () =>
    new Promise(resolve => {
      setIsVerify(true);
      resolve();
    });

  if (type === 'member') {
    props = getMemberChangeFormProps(onSubmit);
  }

  props && isVerify && (props.config = getChangeFormConfig(mode));

  return props && <LoginForm {...props} />;
}
