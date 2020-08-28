import React, { useState } from 'react'
import styles from './index.less'
import { Form, Button } from 'antd'
import LabelInput from '@/components/LabelInput'
import SelectPhoneCountry from '@/components/SelectPhoneCountry'

interface LoginFormProps {
  title: string,
  config: object,
  onSubmit: (data: object) => Promise<void>
}

const LoginForm: React.FC<LoginFormProps> = ({ title, onSubmit }) => {
  const [loading, setLoading] = useState<boolean>(false)

  const onFinish: (data: object) => void = data => {
    setLoading(true)
    onSubmit(data)
      .finally(() => setLoading(false))
  }

  return (
    <div className={styles['login-form-container']}>
      <div className={styles['login-form-title']}>{title}</div>
      <Form onFinish={onFinish}>
        <Form.Item name="email">
          <LabelInput label="邮箱" />
        </Form.Item>
        <Form.Item name="password">
          <LabelInput label="密码" type="password" />
        </Form.Item>
        <Form.Item name="phone">
          <SelectPhoneCountry></SelectPhoneCountry>
        </Form.Item>
        <Form.Item name="phone2">
          <LabelInput label="手机号" type="phone" />
        </Form.Item>
        <Form.Item>
          <Button block size="large" type="primary" htmlType="submit" loading={loading}>{title}</Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default LoginForm