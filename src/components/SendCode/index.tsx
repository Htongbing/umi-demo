import React, { forwardRef, useState, useEffect } from 'react';
import styles from './index.less';
import { FormItemProps, LANGUAGE_KEY } from '@/const';

import { Input, Button } from 'antd';

interface SendCodeProps extends FormItemProps {}

const SendCode: React.ForwardRefRenderFunction<Input, SendCodeProps> = (
  props,
  inputRef: React.Ref<Input>,
) => {
  const [timing, setTiming] = useState<number>(0);
  const [disabled, setDisabled] = useState<boolean>(!!props.controlButtonFn)

  const text: string = timing ? `${LANGUAGE_KEY.resend} (${timing})` : LANGUAGE_KEY.send;

  const send: () => void = () => {
    setTiming(60);
  };

  let timer: number;

  useEffect(() => {
    if (timing > 0) {
      timer = window.setTimeout(() => setTiming(timing - 1), 1000);
    }
    return () => clearTimeout(timer);
  });

  const { formInstance, formData, controlButtonFn, ...rest } = props
  
  if (controlButtonFn) {
    let controlTimer: number

    useEffect(() => {
      controlTimer = setTimeout(() => {
        controlButtonFn(formInstance, setDisabled)
      })
      return () => clearTimeout(controlTimer)
    }, [formData])
  }

  return (
    <Input
      ref={inputRef}
      suffix={
        <Button
          className={styles['send-code-btn']}
          type="link"
          disabled={disabled || !!timing}
          onClick={send}
        >
          {text}
        </Button>
      }
      {...rest}
    />
  );
};

export default forwardRef<Input, SendCodeProps>(SendCode);
