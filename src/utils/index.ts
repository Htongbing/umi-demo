import { FormConfig, LoginFormProps, LANGUAGE_KEY } from '@/const';

export const getInputConfig: Record<string, () => FormConfig> = {
  email(): FormConfig {
    return {
      label: LANGUAGE_KEY.email,
      name: 'email',
    };
  },
  phone(): FormConfig {
    return {
      label: LANGUAGE_KEY.phone,
      name: 'phone',
      type: 'phone',
    };
  },
  username(): FormConfig {
    return {
      label: LANGUAGE_KEY.username,
      name: 'username',
      type: 'username',
    };
  },
  password(): FormConfig {
    return {
      label: LANGUAGE_KEY.password,
      name: 'password',
      type: 'password',
    };
  },
  code(): FormConfig {
    return {
      label: LANGUAGE_KEY.code,
      name: 'code',
      type: 'code',
    };
  },
  repeatPassword(): FormConfig {
    return {
      label: LANGUAGE_KEY.repeatPassword,
      name: 'repeatPassword',
      type: 'password',
    };
  },
};

export const getInputConfigHelper: (...args: any[]) => Array<FormConfig> = (
  ...args
) => args.filter(type => !!type).map(type => getInputConfig[type]());

export const getMemberSignUpFormProps: (
  mode: FormConfig['type'],
  verify: boolean,
) => LoginFormProps = (mode, verify) => ({
  config: getInputConfigHelper(mode, 'password', verify && 'code'),
  onSubmit: () => new Promise(resolve => resolve()),
  buttonText: LANGUAGE_KEY.signUp,
});

export const getAdminSignUpFormProps: () => LoginFormProps = () => ({
  config: getInputConfigHelper('email', 'password', 'phone'),
  onSubmit: () => new Promise(resolve => resolve()),
  buttonText: LANGUAGE_KEY.signUp,
});

export const getMemberSignInFormProps: (
  mode: FormConfig['type'],
) => LoginFormProps = mode => ({
  config: getInputConfigHelper(mode, 'password'),
  onSubmit: () => new Promise(resolve => resolve()),
  buttonText: LANGUAGE_KEY.signIn,
});

export const getAdminSignInFormProps: () => LoginFormProps = () => ({
  config: getInputConfigHelper('email', 'password'),
  onSubmit: () => new Promise(resolve => resolve()),
  buttonText: LANGUAGE_KEY.signIn,
});

export const getDashSignInFormProps: () => LoginFormProps = () => ({
  config: getInputConfigHelper('email', 'password'),
  onSubmit: () => new Promise(resolve => resolve()),
  buttonText: LANGUAGE_KEY.signIn,
});

export const getMemberResetFormProps: (
  mode: FormConfig['type'],
  onSubmit: () => Promise<void>,
) => LoginFormProps = (mode, onSubmit) => ({
  config: getInputConfigHelper(mode, 'code'),
  onSubmit,
  buttonText: LANGUAGE_KEY.confirm,
});

export const getAdminResetFormProps: (
  onSubmit: () => Promise<void>,
) => LoginFormProps = onSubmit => ({
  config: getInputConfigHelper('email', 'code'),
  onSubmit,
  buttonText: LANGUAGE_KEY.confirm,
});

export const getDashResetFormProps: (
  onSubmit: () => Promise<void>,
) => LoginFormProps = onSubmit => ({
  config: getInputConfigHelper('email', 'code'),
  onSubmit,
  buttonText: LANGUAGE_KEY.confirm,
});

export const getResetFormConfig: () => Array<FormConfig> = () =>
  getInputConfigHelper('password', 'repeatPassword');

export const getMemberChangeFormProps: (
  onSubmit: () => Promise<void>,
) => LoginFormProps = onSubmit => ({
  config: getInputConfigHelper('code'),
  onSubmit,
  buttonText: LANGUAGE_KEY.confirm,
});

export const getChangeFormConfig: (
  mode: FormConfig['type'],
) => Array<FormConfig> = mode => getInputConfigHelper(mode, 'code');
