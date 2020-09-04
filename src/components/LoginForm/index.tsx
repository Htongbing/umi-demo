import React, { useState } from 'react';
import styles from './index.less';
import { Form, Button } from 'antd';
import LabelInput from '@/components/LabelInput';
import Username from '@/components/Username';
import { FormConfig } from '@/const'

interface LoginFormProps {
  buttonText: string,
  config: Array<FormConfig>;
  onSubmit: (data: object) => Promise<void>;
}

const generateFormItem = (config: Array<FormConfig>) => config.map(item => (
  <Form.Item key={item.name} name={item.name}>
    {
      item.type === 'username' ? <Username label={item.label} /> : <LabelInput label={item.label} type={item.type} />
    }
  </Form.Item>
))

const LoginForm: React.FC<LoginFormProps> = ({ buttonText, onSubmit, config }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish: (data: object) => void = data => {
    setLoading(true);
    onSubmit(data).finally(() => setLoading(false));
  };

  return (
    <div className={styles['login-form-container']}>
      <Form className={styles['login-form']} onFinish={onFinish}>
        {generateFormItem(config)}
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
