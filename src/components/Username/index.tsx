import React, { useState, useEffect } from 'react'
import LabelInput from '../LabelInput'
import { codePhoneReg, defaultPhoneCode } from '@/const'

const isNumber: RegExp = /^(\d+)$/

interface UsernameProps {
  value?: string,
  onChange?: (value: React.ChangeEvent | string) => void
}

const Username: React.FC<UsernameProps> = props => {
  const { value, onChange } = props
  const [type, setType] = useState<string>('')

  useEffect((): void => {
    if (value) {
      if (!type && isNumber.test(value)) {
        setType('phone')
        onChange?.(`${defaultPhoneCode}-${value}`)
      } else if (type && !isNumber.test(codePhoneReg.exec(value)?.[2] || '')) {
        setType('')
        onChange?.(RegExp.$2)
      }
    }
  }, [value])

  return <LabelInput label="邮箱/手机号" type={type} {...props} />
}

export default Username