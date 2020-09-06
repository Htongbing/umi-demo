import React, { useState } from 'react';
import { history } from 'umi';
import { LoginFormProps } from '@/const';
import {
  getMemberResetFormProps,
  getAdminResetFormProps,
  getDashResetFormProps,
  getResetFormConfig,
} from '@/utils';

import LoginForm from '@/components/LoginForm';

export default function Reset(): React.ReactNode {
  const { type, mode, userId } = history.location.query;

  const [isVerify, setIsVerify] = useState<boolean>(false);

  let props: LoginFormProps | null = null;

  const onSubmit: () => Promise<void> = () =>
    new Promise(resolve => {
      setIsVerify(true);
      resolve();
    });

  if (type === 'member') {
    props = getMemberResetFormProps(mode, onSubmit);
  } else if (type === 'admin') {
    props = getAdminResetFormProps(onSubmit);
  } else if (type === 'dash') {
    props = getDashResetFormProps(onSubmit);
  }

  props && isVerify && (props.config = getResetFormConfig());

  return props && <LoginForm {...props} />;
}
