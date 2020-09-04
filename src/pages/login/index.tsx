import React from 'react'
import styles from './index.less'
import LoginForm from '@/components/LoginForm'
import { history } from 'umi'

interface Config {
  name: string,
  label: string,
  type?: string
}

export default (): React.ReactNode => {
  const config: Array<Config> = []

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