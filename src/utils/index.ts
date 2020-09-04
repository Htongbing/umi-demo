import { FormConfig } from '@/const';

import { MEMBER_FORM_TYPE, MemberFormType } from '@/const'

export const getMemberFormConfig: (mode: MemberFormType) => Array<FormConfig> = mode => [
  {
    ...MEMBER_FORM_TYPE[mode],
    type: mode
  },
  {
    label: 'Password',
    name: 'password',
    type: 'password'
  }
]