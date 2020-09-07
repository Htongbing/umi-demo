import React from 'react';
import { history } from 'umi';
import { LoginFormProps, GetDataComponentProps } from '@/const';
import {
  getMemberResetFormProps,
  getAdminResetFormProps,
  getDashResetFormProps,
  getResetFormConfig,
} from '@/utils';

import LoginForm from '@/components/LoginForm';
import GetData from '@/components/GetData';

function Reset({ isVerify, changeVerify }: GetDataComponentProps): React.ReactNode {
  const { type, mode, userId } = history.location.query;

  let props: LoginFormProps | null = null;

  const onSubmit: () => Promise<void> = () =>
    new Promise(resolve => {
      changeVerify()
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

export default GetData(Reset)
