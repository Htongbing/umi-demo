export const CODE_PHONE_PATTERN: RegExp = /^(\w+(\+\d+))-(.*)$/;

export const INTERNATIONAL_PHONE_PATTERN = /^(?!\b(0)\1+\b)(\+?\d{1,3}[. -]?)?\(?\d{3}\)?([. -]?)\d{3}\3\d{4}$/

export const EMAIL_PATTERN = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/

export const defaultPhoneCode: string = 'cn+86';

export interface FormItemProps {
  value?: string;
  onChange?: (value: React.ChangeEvent | string) => void;
}

export type LabelInputType = 'password' | 'phone' | 'code';

export interface FormConfig {
  label: string;
  name: string;
  type?: LabelInputType | 'username';
  rules?: any[]
}

export interface LoginFormProps {
  buttonText: string;
  config: Array<FormConfig>;
  onSubmit: (data: object) => Promise<void>;
}

export interface GetDataComponentProps extends Record<string, any> {
  isVerify: boolean,
  changeVerify: () => void
}

export const LANGUAGE_KEY: Record<string, string> = {
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
  send: 'Send Code',
  resend: 'Resend'
};
