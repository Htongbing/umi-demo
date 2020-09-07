import React, { useState, useEffect } from 'react';
import LabelInput from '../LabelInput';
import {
  CODE_PHONE_PATTERN,
  defaultPhoneCode,
  FormItemProps,
  LabelInputType,
} from '@/const';

const isNumberReg: RegExp = /^(\d+)$/;

interface UsernameProps extends FormItemProps {
  label?: string;
}

const Username: React.FC<UsernameProps> = props => {
  const { value, onChange } = props;
  const [type, setType] = useState<LabelInputType>();

  useEffect((): void => {
    if (value) {
      if (!type && isNumberReg.test(value)) {
        setType('phone');
        onChange?.(`${defaultPhoneCode}-${value}`);
      } else if (
        type &&
        !isNumberReg.test(CODE_PHONE_PATTERN.exec(value)?.[3] || '')
      ) {
        setType(undefined);
        onChange?.(RegExp.$3);
      }
    }
  }, [value]);

  return <LabelInput type={type} {...props} />;
};

export default Username;
