import { FormConfig } from '@/const';

import { MEMBER_FORM_TYPE, MemberFormType } from '@/const'

export const getMemberFormConfig: (mode: MemberFormType, verify: boolean) => Array<FormConfig> = (mode, verify) => [
  {
    ...MEMBER_FORM_TYPE[mode],
    type: mode
  },
  {
    label: 'Password',
    name: 'password',
    type: 'password'
  },
  ...verify ? [
    {
      label: 'Verification Code',
      name: 'code',
      type: 'code'
    }
  ] : []
]