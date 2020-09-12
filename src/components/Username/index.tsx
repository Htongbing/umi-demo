import React, { useState, useEffect } from 'react';
import LabelInput from '../LabelInput';
import {
  CODE_PHONE_PATTERN,
  DEFAULT_PHONE_CODE,
  UsernameProps,
  LabelInputType,
} from '@/const';

const isNumberReg: RegExp = /^(\d+)$/;

const Username: React.FC<UsernameProps> = props => {
  const { value, onChange } = props;
  const [type, setType] = useState<LabelInputType>('email');

  useEffect((): void => {
    if (value) {
      if (type === 'email' && isNumberReg.test(value)) {
        setType('phone');
        onChange?.(`${DEFAULT_PHONE_CODE}-${value}`);
      } else if (
        type === 'phone' &&
        !isNumberReg.test(CODE_PHONE_PATTERN.exec(value)?.[3] || '')
      ) {
        setType('email');
        onChange?.(RegExp.$3);
      }
    }
  }, [value]);

  return <LabelInput type={type} {...props} />;
};

export default Username;
