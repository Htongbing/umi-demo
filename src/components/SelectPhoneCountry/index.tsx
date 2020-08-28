import React, { forwardRef } from 'react'
import { Select, Input } from 'antd'
import countries from '@/const/countries.ts'
import '@/assets/css/countries.less'
import styles from './index.less'
import { codePhoneReg } from '@/const'

function OptionContent({ name, iso2, dialCode }: { name?: string, iso2: string, dialCode: string }): React.ReactNode {
  return <div className={styles['select-dial-code-option']}>
    <div className={`iti__flag iti__${iso2}`}></div>
    {name && <span className={styles['name']}>{name}</span>}
    <span className={`${styles['value']}${name ? ` ${styles['normal']}` : ''}`}>{`+${dialCode}`}</span>
  </div>
}

const genarateOptions: Array<React.ReactNode> = countries.map(({name, iso2, dialCode}) => (
  <Select.Option key={name} value={`${iso2}+${dialCode}`} label={OptionContent({ iso2, dialCode })}>
    {OptionContent({ name, iso2, dialCode })}
  </Select.Option>
))

interface SelectPhoneCountryProps {
  value?: string,
  onChange?: (value: string) => void
}

const SelectPhoneCountry: React.FC<SelectPhoneCountryProps> = ({ value, onChange }, inputRef) => {
  let inputValue = ''
  let selectCode = 'cn+86'

  const changeValue: (code: string, input: string) => void = (code, input) => onChange?.(`${code}-${input}`)

  if (value && codePhoneReg.test(value)) {
    inputValue = RegExp.$2
    selectCode = RegExp.$1
  }

  return (
    <div className={styles['select-phone-country-container']}>
      <Input className={styles['select-phone-country-input']} ref={inputRef} value={inputValue} onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => changeValue(selectCode, ev.target.value)}></Input>
      <Select className={styles['select-phone-country']} showSearch optionLabelProp="label" dropdownMatchSelectWidth={false} value={selectCode} onChange={(code: string): void => changeValue(code, inputValue)}>
        {genarateOptions}
      </Select>
    </div>
  )
}

export default forwardRef((props, ref) => SelectPhoneCountry(props, ref))