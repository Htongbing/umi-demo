import React from 'react'
import LoginForm from '@/components/LoginForm'
import { FormConfig, FormType, FORM_TYPE } from '@/const'
import { history } from 'umi'
import { getMemberFormConfig } from '@/utils'

export default (): React.ReactNode => {
  const { type, mode, verify } = history.location.query

  const config: Array<FormConfig> = getMemberFormConfig(mode, !!verify)

  const onSubmit: (data: object) => Promise<void> = data => {
    console.log(data)
    return new Promise(resolve => setTimeout(resolve, 1000))
  }

  const props: {
    config: Array<FormConfig>,
    onSubmit: (data: object) => Promise<void>,
    buttonText: string
  } = {
    config,
    onSubmit,
    buttonText: FORM_TYPE[type as FormType]
  }

  return (
    <LoginForm {...props}></LoginForm>
  )
}