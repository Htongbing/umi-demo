import React, { useState, useRef, useEffect } from 'react';
import styles from './index.less';
import { FormConfig, LoginFormProps, Obj } from '@/const';
import { formatterFormData } from '@/utils';
import EventBus from '@/utils/postMessage';
import { FormInstance } from 'antd/es/form';

import { Form, Button } from 'antd';
import LabelInput from '@/components/LabelInput';
import Username from '@/components/Username';

const generateFormItem = (
  config: Array<FormConfig>,
  formData: Obj,
  formInstance: FormInstance | null,
) =>
  config.map(({ name, rules, dependencies, type, ...rest }) => (
    <Form.Item
      className={styles['login-form-item']}
      key={name}
      name={name}
      rules={rules}
      dependencies={dependencies}
    >
      {type === 'username' ? (
        <Username label={rest.label} />
      ) : (
        <LabelInput
          type={type}
          formData={formData}
          formInstance={formInstance}
          {...rest}
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
  const containerRef = useRef<HTMLDivElement>(null);

  const onFinish: (data: Obj) => void = data => {
    setLoading(true);
    onSubmit(formatterFormData(data))
      .then(console.log)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (containerRef.current) {
      const resizeCallback: () => void = () =>
        EventBus.emit('resize', containerRef.current?.offsetHeight);
      const observer = new MutationObserver(resizeCallback);
      observer.observe(containerRef.current, {
        childList: true,
        subtree: true,
      });
      resizeCallback();
      return () => observer.disconnect();
    }
  }, []);

  return (
    <div className={styles['login-form-container']} ref={containerRef}>
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
