import React, { useRef, useState } from 'react';
import styles from './index.less';
import classnames from 'classnames';
import { LabelInputProps, CODE_PHONE_PATTERN } from '@/const';
import { useUpdate } from '@/utils/hooks';

import { Input } from 'antd';
import SelectPhoneCountry from '@/components/SelectPhoneCountry';
import SendCode from '@/components/SendCode';

const LabelInput: React.FC<LabelInputProps> = ({
  type,
  value,
  onChange,
  label,
  formData,
  formInstance,
  controlButtonFn,
  sendCallback,
  onBlur,
}) => {
  const inputRef = useRef<Input | null>(null);
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const props: {
    value?: string;
    onChange?: (value: React.ChangeEvent | string) => void;
    ref: React.Ref<Input>;
    className: string;
    onFocus: () => void;
    onBlur: () => void;
  } = {
    value,
    onChange,
    ref: inputRef,
    className: styles['label-input'],
    onFocus: () => setIsFocus(true),
    onBlur: () => {
      onBlur?.();
      setIsFocus(false);
    },
  };

  let inputComponent: React.ReactNode;
  let inputing: boolean = !!value;

  if (
    type === 'phone' &&
    inputing &&
    CODE_PHONE_PATTERN.test(value || '') &&
    !RegExp.$3
  ) {
    inputing = false;
  }

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
      inputComponent = (
        <SendCode
          {...props}
          formData={formData}
          formInstance={formInstance}
          controlButtonFn={controlButtonFn}
          sendCallback={sendCallback}
        />
      );
      break;
    default:
      inputComponent = <Input {...props} />;
  }

  useUpdate((): void => inputRef.current?.focus(), [type]);

  return (
    <div
      className={classnames(
        styles['label-input-container'],
        'label-input-container',
        { [styles['is-focus']]: isFocus },
      )}
      tabIndex={1}
      onFocus={(): void => inputRef.current?.focus()}
    >
      {!!label && (
        <div
          className={classnames(styles['label-input-placeholder'], {
            [styles['top-placeholder']]: inputing,
          })}
        >
          {label}
        </div>
      )}
      {inputComponent}
    </div>
  );
};

export default LabelInput;
