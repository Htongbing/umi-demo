import React, { useState, useEffect } from 'react'
import LoginForm from '@/components/LoginForm'
import { FormConfig, RESET_FORM, VERIFICATION_FORM } from '@/const'
import { history } from 'umi'
import { getMemberResetFormConfig } from '@/utils'

const Reset: React.FC = () => {
  const { type, mode, uid } = history.location.query

  const [username, setUsername] = useState<string>('')

  let config: Array<FormConfig> = []

  if (uid) {
    config = [{
      label: 'Verification Code',
      name: 'code',
      type: 'code'
    }]
  } else {
    config = type === 'member' ? getMemberResetFormConfig(mode) : VERIFICATION_FORM
  }

  const onSubmit: (data: { username?: string }) => Promise<void> = data => {
    console.log(data)
    setUsername(uid ? uid : data.username || '')
    return new Promise(resolve => setTimeout(resolve, 1000))
  }

  const [props, setProps] = useState<{
    config: Array<FormConfig>,
    onSubmit: (data: object) => Promise<void>,
    buttonText: string
  }>({
    config,
    onSubmit,
    buttonText: 'Confirm'
  })

  useEffect(() => {
    if (username) {
      setProps({
        config: RESET_FORM,
        onSubmit,
        buttonText: 'Reset'
      })
    }
  }, [username])

  return (
    <LoginForm {...props}></LoginForm>
  )
}

export default Reset