import React, { useRef } from 'react'
import styles from './index.less'
import { Input } from 'antd'
import SelectPhoneCountry from '@/components/SelectPhoneCountry'
import { codePhoneReg } from '@/const'

type InputType = 'password' | 'phone' | undefined

interface LabelInputProps {
  type?: InputType,
  value?: string,
  onChange?: (value: React.ChangeEvent | string) => void,
  label: string
}

const LabelInput: React.FC<LabelInputProps> = ({ type, value, onChange, label }) => {
  const inputRef = useRef<Input | null>(null)

  const props: {
    value?: string,
    onChange?: (value: React.ChangeEvent | string) => void,
    ref: React.RefObject<Input>,
    className: string
  } = { value, onChange, ref: inputRef, className: styles['label-input'] }

  let inputComponent: React.ReactNode
  let isTopLabel: boolean = !!value

  switch (type) {
    case 'password':
      inputComponent = <Input.Password {...props} />
      break
    case 'phone':
      props.className = `${props.className} ${styles['select-phone']}`
      isTopLabel = !!value && codePhoneReg.test(value) && !!RegExp.$2
      inputComponent = <SelectPhoneCountry selectorContainerClassName={styles['selector-container']} {...props} />
      break
    default:
      inputComponent = <Input {...props} />
  }

  return (
    <div className={styles['label-input-container']}>
      <div className={`${styles['label-input-placeholder']}${isTopLabel ? ` ${styles['top-placeholder']}` : ''}`} tabIndex={1} onFocus={(): void => inputRef.current?.focus()}>{label}</div>
      {inputComponent}
    </div>
  )
}

export default LabelInput