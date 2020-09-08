import { FormConfig, LoginFormProps, LANGUAGE_KEY, CODE_PHONE_PATTERN, INTERNATIONAL_PHONE_PATTERN, EMAIL_PATTERN, ExtraFormConfig, ControlButtonFn } from '@/const';

export const phoneNumberValidator: (rule: any, value: string) => Promise<void> = (rule, value) => {
  return new Promise((resolve, reject) => {
    if (CODE_PHONE_PATTERN.test(value) && INTERNATIONAL_PHONE_PATTERN.test(`${RegExp.$2}${RegExp.$3}`)) {
      return resolve()
    }
    return reject(LANGUAGE_KEY.phoneError)
  })
}

export const emailValidator: (rule: any, value: string) => Promise<void> = (rule, value) => new Promise((resolve, reject) => EMAIL_PATTERN.test(value) ? resolve() : reject(LANGUAGE_KEY.emailError))

export const usernameValidator: (rule: any, value: string) => Promise<void> = (rule, value) => {
  if (CODE_PHONE_PATTERN.test(value) && RegExp.$3) {
    return phoneNumberValidator(rule, value)
  }
  return emailValidator(rule, value)
}

export const getInputConfig: Record<string, (config?: ExtraFormConfig) => FormConfig> = {
  email(): FormConfig {
    return {
      label: LANGUAGE_KEY.email,
      name: 'email',
      rules: [
        {
          type: 'email',
          required: true,
          message: LANGUAGE_KEY.emailError
        }
      ]
    };
  },
  phone(): FormConfig {
    return {
      label: LANGUAGE_KEY.phone,
      name: 'phone',
      type: 'phone',
      rules: [
        {
          required: true,
          validator: phoneNumberValidator
        }
      ]
    };
  },
  username(): FormConfig {
    return {
      label: LANGUAGE_KEY.username,
      name: 'username',
      type: 'username',
      rules: [
        {
          required: true,
          validator: usernameValidator
        }
      ]
    };
  },
  password(config): FormConfig {
    return {
      label: LANGUAGE_KEY.password,
      name: 'password',
      type: 'password',
      rules: [
        {
          required: true,
          pattern: /\w{8,}/i,
          message: LANGUAGE_KEY.passwordError
        }
      ],
      ...config
    };
  },
  code(config): FormConfig {
    return {
      label: LANGUAGE_KEY.code,
      name: 'code',
      type: 'code',
      rules: [
        {
          required: true,
          message: LANGUAGE_KEY.codeError
        }
      ],
      ...config
    };
  },
};

export const getInputConfigHelper: (...args: any[]) => Array<FormConfig> = (
  ...args
) => args.filter(type => !!type).map(typeObj => {
  if (typeof typeObj === 'string') return getInputConfig[typeObj]()
  const { type, ...args } = typeObj
  return getInputConfig[type](args)
});

export const getMemberSignUpFormProps: (
  mode: FormConfig['type'],
  verify: boolean,
) => LoginFormProps = (mode, verify) => {
  let controlButtonFn: ControlButtonFn | undefined

  if (mode && verify) {
    controlButtonFn = (form, setDisabled) => {
      form && setDisabled(!!form.getFieldError(mode).length)
    }
  }

  return {
    config: getInputConfigHelper(
      mode, 
      'password', 
      verify && { type: 'code', controlButtonFn }
    ),
    onSubmit: () => new Promise(resolve => resolve()),
    buttonText: LANGUAGE_KEY.signUp,
  }
};

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
  getInputConfigHelper('password', {
    type: 'password',
    label: LANGUAGE_KEY.repeatPassword,
    name: 'repeatPassword',
    dependencies: ['password'],
    rules: [
      {
        required: true,
        message: LANGUAGE_KEY.repeatPasswordEmptyError
      },
      ({ getFieldValue }: { getFieldValue: any }) => ({
        validator(rule: any, value: string | undefined): Promise<void> {
          if (!value || getFieldValue('password') === value) {
            return Promise.resolve()
          }
          return Promise.reject(LANGUAGE_KEY.repeatPasswordError)
        }
      })
    ]
  });

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
