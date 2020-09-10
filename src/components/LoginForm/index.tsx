import React, { useState, useRef } from 'react';
import styles from './index.less';
import { FormConfig, LoginFormProps, Obj, CODE_PHONE_PATTERN } from '@/const';
import { FormInstance } from 'antd/es/form';

import { Form, Button } from 'antd';
import LabelInput from '@/components/LabelInput';
import Username from '@/components/Username';

const generateFormItem = (
  config: Array<FormConfig>,
  formData: Obj,
  formInstance: FormInstance | null,
) =>
  config.map(item => (
    <Form.Item
      className={styles['login-form-item']}
      key={item.name}
      name={item.name}
      rules={item.rules}
      dependencies={item.dependencies}
    >
      {item.type === 'username' ? (
        <Username label={item.label} />
      ) : (
        <LabelInput
          label={item.label}
          type={item.type}
          formData={formData}
          formInstance={formInstance}
          controlButtonFn={item.controlButtonFn}
          sendCallback={item.sendCallback}
        />
      )}
    </Form.Item>
  ));

const LoginForm: React.FC<LoginFormProps> = ({
  buttonText,
  onSubmit,
  config,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<Obj>({});

  const formRef = useRef<FormInstance>(null);

  const onFinish: (data: Obj) => void = data => {
    const result = { ...data };
    if (data.phone || CODE_PHONE_PATTERN.test(data.username)) {
      const exec: null | string[] = CODE_PHONE_PATTERN.exec(
        data.phone || data.username,
      );
      if (exec) {
        result[
          data.username ? 'username' : 'phone'
        ] = `${exec[2]}${exec[3]}`.replace('+', '00');
      }
    }
    setLoading(true);
    onSubmit(result)
      .then(console.log)
      .finally(() => setLoading(false));
  };

  return (
    <div className={styles['login-form-container']}>
      <Form
        className={styles['login-form']}
        ref={formRef}
        onFinish={onFinish}
        onValuesChange={(current: Obj, all: Obj): void => setFormData(all)}
        validateTrigger="onBlur"
      >
        {generateFormItem(config, formData, formRef.current)}
        <Form.Item>
          <Button
            className={styles['login-form-button']}
            block
            size="large"
            htmlType="submit"
            loading={loading}
          >
            {buttonText}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
