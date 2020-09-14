import axios from '@/service';
import { UDBParams } from '@/const';

export const getMemberInitConfig: (
  params: UDBParams,
) => Promise<any> = params => axios.get('/reg/registermix/init.do', { params });

export const getAdminInitConfig: (params: UDBParams) => Promise<any> = params =>
  axios.get('/reg/registeradmin/init.do', { params });

export const getLoginInitConfig: (params: UDBParams) => Promise<any> = params =>
  axios.get('/lgn/login/init.do', { params });

export const getInviteSignUpInitConfig: (
  params: UDBParams,
) => Promise<any> = params => axios.get('/aq/pwd/reg/init.do', { params });

export const getBindEmailInitConfig: (
  params: UDBParams,
) => Promise<any> = params => axios.get('/aq/email/bind/init.do', { params });

export const getBindPhoneInitConfig: (
  params: UDBParams,
) => Promise<any> = params => axios.get('/aq/mobile/bind/init.do', { params });

export const getChangePasswordInitConfig: (
  params: UDBParams,
) => Promise<any> = params => axios.get('/aq/pwd/change/init.do', { params });

export const signUpMember: (params: UDBParams) => Promise<any> = params =>
  axios.get('/reg/registermix/regcore.do', { params });

export const signUpAdmin: (params: UDBParams) => Promise<any> = params =>
  axios.get('/reg/registeradmin/regcore.do', { params });

export const resetInvitePassword: (
  params: UDBParams,
) => Promise<any> = params => axios.get('/aq/pwd/reg/modify.do', { params });

export const sendSignUpVerificationCode: (
  params: UDBParams,
) => Promise<any> = params =>
  axios.get('/reg/register/sendverifycode.do', { params });

export const checkAccount: (params: UDBParams) => Promise<any> = params =>
  axios.get('/reg/register/checkacct.do', { params });

export const checkResetAccount: (params: UDBParams) => Promise<any> = params =>
  axios.get('/aq/pwd/retrieve/prechk.do', { params });

export const sendBindEmailVerificationCode: (
  params: UDBParams,
) => Promise<any> = params =>
  axios.get('/aq/email/bind/sendCode.do', { params });

export const verifyBindEmailVerificationCode: (
  params: UDBParams,
) => Promise<any> = params => axios.get('/aq/email/bind/bind.do', { params });

export const sendBindPhoneVerificationCode: (
  params: UDBParams,
) => Promise<any> = params =>
  axios.get('/aq/mobile/bind/sendSms.do', { params });

export const verifyBindPhoneVerificationCode: (
  params: UDBParams,
) => Promise<any> = params => axios.get('/aq/mobile/bind/bind.do', { params });

export const changeAccountPassword: (
  params: UDBParams,
) => Promise<any> = params => axios.get('/aq/pwd/change/modify.do', { params });

export const getMethodList: (params: UDBParams) => Promise<any> = params =>
  axios.get('/aq/uni/getMethodList.do', { params });

export const sendEmailVerificationCode: (
  params: UDBParams,
) => Promise<any> = params => axios.get('/aq/uni/sendEmailCode.do', { params });

export const verifyEmailVerificationCode: (
  params: UDBParams,
) => Promise<any> = params =>
  axios.get('/aq/uni/verifyEmailCode.do', { params });

export const sendPhoneVerificationCode: (
  params: UDBParams,
) => Promise<any> = params => axios.get('/aq/uni/sendSms.do', { params });

export const verifyPhoneVerificationCode: (
  params: UDBParams,
) => Promise<any> = params => axios.get('/aq/uni/verifySms.do', { params });

export const resetPassword: (params: UDBParams) => Promise<any> = params =>
  axios.get('/aq/pwd/retrieve/modify.do', { params });

export const loginAccount: (params: UDBParams) => Promise<any> = params =>
  axios.get('/lgn/login/verify.do', { params });
