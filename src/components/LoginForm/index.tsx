import React, { useState } from 'react';
import styles from './index.less';
import { Form, Button } from 'antd';
import LabelInput from '@/components/LabelInput';
import SelectPhoneCountry from '@/components/SelectPhoneCountry';
import Username from '@/components/Username';

interface LoginFormProps {
  title: string;
  config: object;
  onSubmit: (data: object) => Promise<void>;
}

const LoginForm: React.FC<LoginFormProps> = ({ title, onSubmit }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish: (data: object) => void = data => {
    setLoading(true);
    onSubmit(data).finally(() => setLoading(false));
  };

  return (
    <div className={styles['login-form-container']}>
      <div className={styles['login-form-title']}>{title}</div>
      <Form className={styles['login-form']} onFinish={onFinish}>
        <Form.Item name="email">
          <LabelInput label="Email" />
        </Form.Item>
        <Form.Item name="password">
          <LabelInput label="Password" type="password" />
        </Form.Item>
        <Form.Item name="phone">
          <SelectPhoneCountry></SelectPhoneCountry>
        </Form.Item>
        <Form.Item name="phone2">
          <LabelInput label="手机号" type="phone" />
        </Form.Item>
        <Form.Item name="username">
          <Username />
        </Form.Item>
        <Form.Item>
          <Button
            className={styles['login-form-button']}
            block
            size="large"
            htmlType="submit"
            loading={loading}
          >
            {title}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
