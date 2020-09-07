export const codePhoneReg: RegExp = /^(\w+\+\d+)-(.*)$/;

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
};
