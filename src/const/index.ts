import { FormInstance } from 'antd/es/form'

export const CODE_PHONE_PATTERN: RegExp = /^(\w+(\+\d+))-(.*)$/;

export const INTERNATIONAL_PHONE_PATTERN = /^(?!\b(0)\1+\b)(\+?\d{1,3}[. -]?)?\(?\d{3}\)?([. -]?)\d{3}\3\d{4}$/

export const EMAIL_PATTERN = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/

export const defaultPhoneCode: string = 'cn+86';

export type ControlButtonFn = (form: FormInstance | null | undefined, setDisabled: React.Dispatch<React.SetStateAction<boolean>>) => void

export interface FormItemProps {
  value?: string;
  onChange?: (value: React.ChangeEvent | string) => void;
  formInstance?: FormInstance | null,
  formData?: Obj,
  controlButtonFn?: ControlButtonFn
}

export type LabelInputType = 'password' | 'phone' | 'code';

export interface FormConfig {
  label: string;
  name: string;
  type?: LabelInputType | 'username';
  rules?: any[],
  controlButtonFn?: ControlButtonFn
}

export type ExtraFormConfig = Record<keyof FormConfig, any>

export interface LoginFormProps {
  buttonText: string;
  config: Array<FormConfig>;
  onSubmit: (data: object) => Promise<void>;
}

export interface GetDataComponentProps extends Record<string, any> {
  isVerify: boolean,
  changeVerify: () => void
}

export type Obj = Record<string, string>

export const LANGUAGE_KEY: Obj = {
  email: 'Email',
  phone: 'Phone',
  username: 'Email/Phone',
  password: 'Password',
  repeatPassword: 'Repeat Password',
  code: 'Verification Code',
  signUp: 'Sign Up',
  signIn: 'Sign In',
  confirm: 'Confirm',
  emailError: 'Please enter the correct email',
  phoneError: 'Please enter the correct phone number',
  codeError: 'Please enter the verification code',
  passwordError: 'Please enter at least 8 character',
  send: 'Send Code',
  resend: 'Resend'
};
