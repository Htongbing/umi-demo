import {
  FormConfig,
  LoginFormProps,
  LANGUAGE_KEY,
  CODE_PHONE_PATTERN,
  INTERNATIONAL_PHONE_PATTERN,
  EMAIL_PATTERN,
  ExtraFormConfig,
  ControlButtonFn,
  UDBParams,
  Obj,
  SendCallback,
} from '@/const';
import {
  signUpMember,
  signUpAdmin,
  sendSignUpVerificationCode,
  checkAccount,
  loginAccount,
  checkResetAccount,
  getMethodList,
  sendEmailVerificationCode,
  verifyEmailVerificationCode,
} from '@/service/udb';

declare const UDB: any;

export const phoneNumberValidator: (
  rule: any,
  value: string,
) => Promise<void> = (rule, value) => {
  return new Promise((resolve, reject) => {
    if (
      CODE_PHONE_PATTERN.test(value) &&
      INTERNATIONAL_PHONE_PATTERN.test(`${RegExp.$2}${RegExp.$3}`)
    ) {
      return resolve();
    }
    return reject(LANGUAGE_KEY.phoneError);
  });
};

export const emailValidator: (rule: any, value: string) => Promise<void> = (
  rule,
  value,
) =>
  new Promise((resolve, reject) =>
    EMAIL_PATTERN.test(value) ? resolve() : reject(LANGUAGE_KEY.emailError),
  );

export const usernameValidator: (rule: any, value: string) => Promise<void> = (
  rule,
  value,
) => {
  if (CODE_PHONE_PATTERN.test(value) && RegExp.$3) {
    return phoneNumberValidator(rule, value);
  }
  return emailValidator(rule, value);
};

export const controlButtonFunction: (
  mode: FormConfig['type'],
) => ControlButtonFn = mode => (form, setDisabled) => {
  if (form) {
    let disabled: boolean = false;
    let validator: (rule: any, value: string) => Promise<void>;

    if (mode === 'username') {
      validator = usernameValidator;
    } else if (mode === 'phone') {
      validator = phoneNumberValidator;
    } else {
      validator = emailValidator;
    }

    validator(null, form.getFieldValue(mode as string))
      .catch(() => (disabled = true))
      .finally(() => setDisabled(disabled));
  }
};

export const updateToken = (
  params: UDBParams,
  newParams: Record<string, string>,
): void => {
  Object.keys(newParams).forEach(k => {
    const v: any = newParams[k];
    v && (params[k as keyof UDBParams] = v);
  });
};

export const getInputConfig: Record<
  string,
  (config?: ExtraFormConfig) => FormConfig
> = {
  email(): FormConfig {
    return {
      label: LANGUAGE_KEY.email,
      name: 'email',
      rules: [
        {
          type: 'email',
          required: true,
          message: LANGUAGE_KEY.emailError,
        },
      ],
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
          validator: phoneNumberValidator,
        },
      ],
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
          validator: usernameValidator,
        },
      ],
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
          message: LANGUAGE_KEY.passwordError,
        },
      ],
      ...config,
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
          message: LANGUAGE_KEY.codeError,
        },
      ],
      ...config,
    };
  },
};

export const getInputConfigHelper: (...args: any[]) => Array<FormConfig> = (
  ...args
) =>
  args
    .filter(type => !!type)
    .map(typeObj => {
      if (typeof typeObj === 'string') return getInputConfig[typeObj]();
      const { type, ...args } = typeObj;
      return getInputConfig[type](args);
    });

export const getMemberSignUpFormProps: (
  mode: FormConfig['type'],
  verify: boolean,
  params: UDBParams,
) => LoginFormProps = (mode, verify, params) => {
  let controlButtonFn: ControlButtonFn | undefined;
  let sendCallback: SendCallback | undefined;

  if (mode && verify) {
    controlButtonFn = controlButtonFunction(mode);
    sendCallback = formData => {
      let acct = formData[mode];
      if (CODE_PHONE_PATTERN.test(acct)) {
        acct = `${RegExp.$2}${RegExp.$3}`.replace('+', '00');
      }
      checkAccount({ ...params, acct }).then(({ stoken }) => {
        updateToken(params, { stoken });
        sendSignUpVerificationCode({ acct, ...params }).then(({ stoken }) =>
          updateToken(params, { stoken }),
        );
      });
    };
  }

  const onSubmit: (data: Obj) => Promise<any> = data => {
    const payload: Obj = {
      acct: data.email || data.phone || data.username,
      passwd: UDB.SDK.rsa.RSAUtils.encryptedString(data.password),
      verifycode: data.code,
      isverify: verify ? '1' : '0',
    };
    if (verify) {
      return signUpMember({ ...payload, ...params });
    }
    return checkAccount({ ...params, acct: payload.acct }).then(
      ({ stoken }) => {
        updateToken(params, { stoken });
        signUpMember({ ...payload, ...params });
      },
    );
  };

  return {
    config: getInputConfigHelper(
      mode,
      'password',
      verify && { type: 'code', controlButtonFn, sendCallback },
    ),
    onSubmit,
    buttonText: LANGUAGE_KEY.signUp,
  };
};

export const getAdminSignUpFormProps: (
  params: UDBParams,
) => LoginFormProps = params => {
  const onSubmit: (data: Obj) => Promise<any> = data => {
    const payload: Obj = {
      acct: data.email,
      passwd: UDB.SDK.rsa.RSAUtils.encryptedString(data.password),
    };
    return checkAccount({ ...params, acct: payload.acct }).then(
      ({ stoken }) => {
        updateToken(params, { stoken });
        signUpAdmin({ ...payload, ...params });
      },
    );
  };

  return {
    config: getInputConfigHelper('email', 'password', 'phone'),
    onSubmit,
    buttonText: LANGUAGE_KEY.signUp,
  };
};

export const getMemberSignInFormProps: (
  mode: FormConfig['type'],
  params: UDBParams,
) => LoginFormProps = (mode, params) => {
  const onSubmit: (data: Obj) => Promise<any> = data => {
    const payload: Obj = {
      acct: data[mode as string],
      pwd: UDB.SDK.rsa.RSAUtils.encryptedString(data.password),
    };
    return loginAccount({ ...payload, ...params });
  };
  return {
    config: getInputConfigHelper(mode, 'password'),
    onSubmit,
    buttonText: LANGUAGE_KEY.signIn,
  };
};

export const getAdminSignInFormProps: (
  params: UDBParams,
) => LoginFormProps = params => {
  const onSubmit: (data: Obj) => Promise<any> = data => {
    const payload: Obj = {
      acct: data.email,
      pwd: UDB.SDK.rsa.RSAUtils.encryptedString(data.password),
    };
    return loginAccount({ ...payload, ...params });
  };
  return {
    config: getInputConfigHelper('email', 'password'),
    onSubmit,
    buttonText: LANGUAGE_KEY.signIn,
  };
};

export const getDashSignInFormProps: () => LoginFormProps = () => ({
  config: getInputConfigHelper('email', 'password'),
  onSubmit: () => new Promise(resolve => resolve()),
  buttonText: LANGUAGE_KEY.signIn,
});

export const getMemberResetFormProps: (
  mode: FormConfig['type'],
  onSubmit: () => Promise<any>,
) => LoginFormProps = (mode, onSubmit) => ({
  config: getInputConfigHelper(mode, 'code'),
  onSubmit,
  buttonText: LANGUAGE_KEY.confirm,
});

export const getAdminResetFormProps: (
  params: UDBParams,
  callback: () => void,
) => LoginFormProps = (params, callback) => {
  const controlButtonFn: ControlButtonFn = controlButtonFunction('email');
  const sendCallback: SendCallback = async formData => {
    const { stoken, data } = await checkResetAccount({
      ...params,
      account: formData.email,
    });
    updateToken(params, { stoken, servcode: data?.servcode });
    const { stoken: nextStoken } = await getMethodList(params);
    updateToken(params, { stoken: nextStoken });
    const { stoken: lastStoken } = await sendEmailVerificationCode(params);
    updateToken(params, { stoken: lastStoken });
  };
  const onSubmit = (data: Obj): Promise<any> => {
    if (params.stoken) {
      return verifyEmailVerificationCode({ ...params, code: data.code }).then(
        ({ stoken, data }) => {
          updateToken(params, { stoken, oauthToken: data?.oauthToken });
          callback();
        },
      );
    }
    return Promise.reject();
  };
  return {
    config: getInputConfigHelper('email', {
      type: 'code',
      controlButtonFn,
      sendCallback,
    }),
    onSubmit,
    buttonText: LANGUAGE_KEY.confirm,
  };
};

export const getDashResetFormProps: (
  onSubmit: () => Promise<any>,
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
        message: LANGUAGE_KEY.repeatPasswordEmptyError,
      },
      ({ getFieldValue }: { getFieldValue: any }) => ({
        validator(rule: any, value: string | undefined): Promise<void> {
          if (!value || getFieldValue('password') === value) {
            return Promise.resolve();
          }
          return Promise.reject(LANGUAGE_KEY.repeatPasswordError);
        },
      }),
    ],
  });

export const getMemberChangeFormProps: (
  onSubmit: () => Promise<any>,
) => LoginFormProps = onSubmit => ({
  config: getInputConfigHelper('code'),
  onSubmit,
  buttonText: LANGUAGE_KEY.confirm,
});

export const getChangeFormConfig: (
  mode: FormConfig['type'],
) => Array<FormConfig> = mode => getInputConfigHelper(mode, 'code');
