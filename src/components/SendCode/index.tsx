import React, { forwardRef, useState, useEffect } from 'react';
import styles from './index.less';
import { FormItemProps } from '@/const';

import { Input, Button } from 'antd';

interface SendCodeProps extends FormItemProps {}

const SendCode: React.ForwardRefRenderFunction<Input, SendCodeProps> = (
  props,
  inputRef: React.Ref<Input>,
) => {
  const [timing, setTiming] = useState<number>(0);

  const text: string = timing ? `Resend (${timing})` : 'Send';

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

  return (
    <Input
      ref={inputRef}
      suffix={
        <Button
          className={styles['send-code-btn']}
          type="link"
          disabled={!!timing}
          onClick={send}
        >
          {text}
        </Button>
      }
      {...props}
    />
  );
};

export default forwardRef<Input, SendCodeProps>(SendCode);
