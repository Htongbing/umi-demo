import React, { useState, useEffect } from 'react'
import LoginForm from '@/components/LoginForm'
import { FormConfig } from '@/const'
import { getMemberResetFormConfig } from '@/utils'
import { history } from 'umi'

const Reset: React.FC = () => {
  const { mode } = history.location.query

  const [isVerify, setIsVerify] = useState<boolean>(false)

  const onSubmit: (data: { username?: string }) => Promise<void> = data => {
    console.log(data)
    setIsVerify(true)
    return new Promise(resolve => setTimeout(resolve, 1000))
  }

  const [props, setProps] = useState<{
    config: Array<FormConfig>,
    onSubmit: (data: object) => Promise<void>,
    buttonText: string
  }>({
    config: [
      {
        label: 'Password',
        name: 'password',
        type: 'password'
      }
    ],
    onSubmit,
    buttonText: 'Confirm'
  })

  useEffect(() => {
    if (isVerify) {
      setProps({
        config: getMemberResetFormConfig(mode),
        onSubmit,
        buttonText: 'Confirm'
      })
    }
  }, [isVerify])

  return (
    <LoginForm {...props}></LoginForm>
  )
}

export default Reset