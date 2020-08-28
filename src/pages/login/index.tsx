import React, { useState } from 'react'
import styles from './index.less'
import LoginForm from '@/components/LoginForm'

export default (): React.ReactNode => {
  const [config, setConfig] = useState<object>({})

  const onSubmit: (data: object) => Promise<void> = data => {
    console.log(data)
    return new Promise(resolve => setTimeout(resolve, 1000))
  }

  return (
    <div className={styles['login-container']}>
      <LoginForm title="Sign In" config={config} onSubmit={onSubmit}></LoginForm>
    </div>
  )
}