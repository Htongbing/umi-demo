import React from 'react';
import { LoginFormProps, GetDataComponentProps } from '@/const';
import { getMemberChangeFormProps, getChangeFormConfig } from '@/utils';

import LoginForm from '@/components/LoginForm';
import GetData from '@/components/GetData';

function Change({
  isVerify,
  changeVerify,
  history,
}: GetDataComponentProps): React.ReactNode {
  const { type, mode } = history.location.query;

  let props: LoginFormProps | null = null;

  const onSubmit: () => Promise<void> = () =>
    new Promise(resolve => {
      changeVerify();
      resolve();
    });

  if (type === 'member') {
    props = getMemberChangeFormProps(onSubmit);
  }

  props && isVerify && (props.config = getChangeFormConfig(mode));

  return props && <LoginForm {...props} />;
}

export default GetData(Change);
