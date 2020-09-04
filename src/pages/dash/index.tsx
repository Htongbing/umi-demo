import React from 'react'
import LoginForm from '@/components/LoginForm'
import { FormConfig, DASH_FORM, FORM_TYPE } from '@/const'
import { history } from 'umi'

export default (): React.ReactNode => {
  const { type } = history.location.query

  const config: Array<FormConfig> = DASH_FORM[type as 'signIn'] || []

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
    buttonText: FORM_TYPE[type as 'signIn']
  }

  return (
    <LoginForm {...props}></LoginForm>
  )
}