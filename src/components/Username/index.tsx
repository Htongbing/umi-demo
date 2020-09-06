import React, { useState, useEffect } from 'react';
import LabelInput from '../LabelInput';
import {
  codePhoneReg,
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
        !isNumberReg.test(codePhoneReg.exec(value)?.[2] || '')
      ) {
        setType(undefined);
        onChange?.(RegExp.$2);
      }
    }
  }, [value]);

  return <LabelInput type={type} {...props} />;
};

export default Username;
