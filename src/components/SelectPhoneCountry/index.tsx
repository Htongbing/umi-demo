import React, { forwardRef, useState } from 'react';
import styles from './index.less';
import classnames from 'classnames';
import countries from '@/const/countries.ts';
import {
  CODE_PHONE_PATTERN,
  DEFAULT_PHONE_CODE,
  SelectPhoneCountryProps,
} from '@/const';
import '@/assets/css/countries.less';

import { Select, Input } from 'antd';

function OptionContent({
  name,
  iso2,
  dialCode,
}: {
  name?: string;
  iso2: string;
  dialCode: string;
}): React.ReactNode {
  return (
    <div className={styles['select-dial-code-option']}>
      <div className={`iti__flag iti__${iso2}`}></div>
      {name && (
        <>
          <span className={styles['name']}>{name}</span>
          <span
            className={classnames(styles['value'], styles['normal'])}
          >{`+${dialCode}`}</span>
        </>
      )}
    </div>
  );
}

const genarateOptions: Array<React.ReactNode> = countries.map(
  ({
    name,
    iso2,
    dialCode,
  }: {
    name: string;
    iso2: string;
    dialCode: string;
  }): React.ReactNode => (
    <Select.Option
      key={name}
      value={`${iso2}+${dialCode}`}
      label={OptionContent({ iso2, dialCode })}
    >
      {OptionContent({ name, iso2, dialCode })}
    </Select.Option>
  ),
);

const SelectPhoneCountry: React.ForwardRefRenderFunction<
  Input,
  SelectPhoneCountryProps
> = (
  { value, onChange, className, selectorContainerClassName, onBlur, onFocus },
  inputRef: React.Ref<Input>,
) => {
  const [prefix, setPerfix] = useState<string>('');

  let inputValue: string = '';
  let selectCode: string = DEFAULT_PHONE_CODE;

  const changeValue: (code: string, input: string) => void = (code, input) =>
    onChange?.(`${code}-${input}`);

  if (value && CODE_PHONE_PATTERN.test(value)) {
    inputValue = RegExp.$3;
    selectCode = RegExp.$1;
  }

  return (
    <div
      className={classnames(
        styles['select-phone-country-container'],
        className,
      )}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      {prefix && !!inputValue && (
        <div className={styles['code-prefix']}>{prefix}</div>
      )}
      <Input
        className={styles['select-phone-country-input']}
        ref={inputRef}
        value={inputValue}
        onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
          changeValue(selectCode, ev.target.value)
        }
      ></Input>
      <Select
        className={classnames(
          styles['select-phone-country'],
          selectorContainerClassName,
        )}
        optionLabelProp="label"
        dropdownMatchSelectWidth={false}
        value={selectCode}
        onChange={(code: string): void => {
          setPerfix(CODE_PHONE_PATTERN.exec(`${code}-`)?.[2] || '');
          changeValue(code, inputValue);
        }}
      >
        {genarateOptions}
      </Select>
    </div>
  );
};

export default forwardRef<Input, SelectPhoneCountryProps>(SelectPhoneCountry);
