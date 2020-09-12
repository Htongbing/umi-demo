import { FormInstance } from 'antd/es/form';

export const CODE_PHONE_PATTERN: RegExp = /^(\w+(\+\d+))-(.*)$/;

export const INTERNATIONAL_PHONE_PATTERN: RegExp = /^(?!\b(0)\1+\b)(\+?\d{1,3}[. -]?)?\(?\d{3}\)?([. -]?)\d{3}\3\d{4}$/;

export const EMAIL_PATTERN: RegExp = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

export const AXIOS_BASE_URL: string = '/';

export const defaultPhoneCode: string = 'us+1';

export const LOGIN_TYPE: string[] = ['member', 'admin', 'dash'];

export type ControlButtonFn = (
  form: FormInstance | null | undefined,
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>,
) => void;

export type SendCallback = (formData: Obj) => void;

export type Obj = Record<string, string>;

export interface FormItemProps {
  value?: string;
  onChange?: (value: React.ChangeEvent | string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  formInstance?: FormInstance | null;
  formData?: Obj;
  controlButtonFn?: ControlButtonFn;
  sendCallback?: SendCallback;
}

export type LabelInputType = 'password' | 'phone' | 'code' | 'email';

export interface FormConfig {
  label: string;
  name: string;
  type?: LabelInputType | 'username';
  rules?: any[];
  controlButtonFn?: ControlButtonFn;
  dependencies?: string[];
  sendCallback?: SendCallback;
}

export type ExtraFormConfig = Record<keyof FormConfig, any>;

export interface LoginFormProps {
  buttonText: string;
  config: Array<FormConfig>;
  onSubmit: (data: Obj) => Promise<any>;
}

export interface GetDataComponentProps extends Record<string, any> {
  isVerify: boolean;
  changeVerify: () => void;
}

export interface UDBParams {
  appid: string;
  subappid?: string;
  callback?: string;
  stoken?: string;
  acct?: string;
  type?: string;
  isverify?: '0' | '1';
  account?: string;
  code?: string;
  pwd?: string;
  regpwd?: string;
  token?: string;
  servcode?: string;
}

export const LANGUAGE_KEY: Obj = {
  email: 'Email',
  phone: 'Phone',
  username: 'Email/Phone',
  password: 'Password',
  repeatPassword: 'Repeat Password',
  primevalPassword: 'Primeval Password',
  code: 'Verification Code',
  signUp: 'Sign Up',
  signIn: 'Sign In',
  confirm: 'Confirm',
  emailError: 'Please enter the correct email',
  phoneError: 'Please enter the correct phone number',
  codeError: 'Please enter the verification code',
  passwordError: 'Please enter at least 8 character',
  repeatPasswordError: 'The two passwords that you entered do not match',
  repeatPasswordEmptyError: 'Please confirm your password',
  send: 'Send Code',
  resend: 'Resend',
};
