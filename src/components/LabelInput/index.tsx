import React, { useRef } from 'react';
import styles from './index.less';
import classnames from 'classnames';
import { LabelInputType, FormItemProps } from '@/const';
import { useUpdate } from '@/utils/hooks';

import { Input } from 'antd';
import SelectPhoneCountry from '@/components/SelectPhoneCountry';
import SendCode from '@/components/SendCode';

interface LabelInputProps extends FormItemProps {
  type?: LabelInputType;
  label?: string;
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
  let inputing: boolean = type === 'phone' || !!value;

  props.className = classnames(props.className, {
    [styles['input-ing']]: inputing,
  });

  switch (type) {
    case 'password':
      inputComponent = <Input.Password {...props} />;
      break;
    case 'phone':
      inputComponent = (
        <SelectPhoneCountry
          selectorContainerClassName={styles['selector-container']}
          {...props}
        />
      );
      break;
    case 'code':
      inputComponent = <SendCode {...props} />;
      break;
    default:
      inputComponent = <Input {...props} />;
  }

  useUpdate((): void => inputRef.current?.focus(), [type]);

  return (
    <div className={classnames(styles['label-input-container'], 'label-input-container')}>
      {!!label && (
        <div
          className={classnames(styles['label-input-placeholder'], {
            [styles['top-placeholder']]: inputing,
          })}
          tabIndex={1}
          onFocus={(): void => inputRef.current?.focus()}
        >
          {label}
        </div>
      )}
      {inputComponent}
    </div>
  );
};

export default LabelInput;
