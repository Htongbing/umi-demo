import React from 'react'
import styles from './index.less'
import LoginForm from '@/components/LoginForm'

export default (): React.ReactNode => {

  const onSubmit: (data: object) => Promise<void> = data => {
    console.log(data)
    return new Promise(resolve => setTimeout(resolve, 1000))
  }

  return (
    <div className={styles['login-container']}>
      <LoginForm buttonText="test" config={[
        {
          label: 'Verification Code',
          name: 'code',
          type: 'code'
        }
      ]} onSubmit={onSubmit}></LoginForm>
    </div>
  )
}