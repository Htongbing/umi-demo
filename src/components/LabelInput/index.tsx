import React, { useRef, useEffect } from 'react';
import styles from './index.less';
import { Input } from 'antd';
import classnames from 'classnames';
import SelectPhoneCountry from '@/components/SelectPhoneCountry';
import { codePhoneReg } from '@/const';
import { useUpdate } from '@/utils/hooks';

type InputType = 'password' | 'phone' | string | undefined;

interface LabelInputProps {
  type?: InputType;
  value?: string;
  onChange?: (value: React.ChangeEvent | string) => void;
  label: string;
}

const LabelInput: React.FC<LabelInputProps> = ({
  type,
  value,
  onChange,
  label,
}) => {
  const inputRef = useRef<Input | null>(null);

  const props: {
    value?: string;
    onChange?: (value: React.ChangeEvent | string) => void;
    ref: React.Ref<Input>;
    className: string;
  } = { value, onChange, ref: inputRef, className: styles['label-input'] };

  let inputComponent: React.ReactNode;
  let inputing: boolean = !!value;

  props.className = classnames(props.className, {
    [styles['input-ing']]: inputing,
  });

  switch (type) {
    case 'password':
      inputComponent = <Input.Password {...props} />;
      break;
    case 'phone':
      props.className = classnames(props.className, styles['select-phone']);
      inputing = !!value && codePhoneReg.test(value) && !!RegExp.$2;
      inputComponent = (
        <SelectPhoneCountry
          selectorContainerClassName={styles['selector-container']}
          {...props}
        />
      );
      break;
    default:
      inputComponent = <Input {...props} />;
  }

  useUpdate((): void => inputRef.current?.focus(), [type]);

  return (
    <div className={styles['label-input-container']}>
      <div
        className={classnames(styles['label-input-placeholder'], {
          [styles['top-placeholder']]: inputing,
        })}
        tabIndex={1}
        onFocus={(): void => inputRef.current?.focus()}
      >
        {label}
      </div>
      {inputComponent}
    </div>
  );
};

export default LabelInput;
