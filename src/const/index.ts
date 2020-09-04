export const codePhoneReg: RegExp = /^(\w+\+\d+)-(.*)$/

export const defaultPhoneCode: string = 'cn+86'

export type FormType = 'signIn' | 'signUp'

export interface FormConfig {
  label?: string,
  name?: string,
  type?: string
}

export interface FormTypeMap {
  signIn: Array<FormConfig>,
  signUp: Array<FormConfig>
}

export type MemberFormType = 'email' | 'phone' | 'username'

export const ADMIN_SIGN_IN: Array<FormConfig> = [
  {
    label: 'Email',
    name: 'email',
    type: 'email'
  },
  {
    label: 'Password',
    name: 'password',
    type: 'password'
  }
]

export const ADMIN_SIGN_UP: Array<FormConfig> = [
  {
    label: 'Email',
    name: 'email',
    type: 'email'
  },
  {
    label: 'Password',
    name: 'password',
    type: 'password'
  },
  {
    label: 'Phone',
    name: 'phone',
    type: 'phone'
  }
]

export const ADMIN_FORM: FormTypeMap = {
  signIn: ADMIN_SIGN_IN,
  signUp: ADMIN_SIGN_UP
}

export const FORM_TYPE = {
  signIn: 'SignIn',
  signUp: 'SignUp'
}

export const MEMBER_FORM_TYPE = {
  phone: {
    label: 'Phone',
    name: 'phone'
  },
  email: {
    label: 'Email',
    name: 'email'
  },
  username: {
    label: 'Email/Phone',
    name: 'username'
  }
}
