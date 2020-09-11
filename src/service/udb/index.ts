import axios from '@/service';
import { UDBParams } from '@/const';

export const getMemberInitConfig: (
  params: UDBParams,
) => Promise<any> = params => axios.get('/reg/registermix/init.do', { params });

export const getAdminInitConfig: (params: UDBParams) => Promise<any> = params =>
  axios.get('/reg/registeradmin/init.do', { params });

export const getLoginInitConfig: (params: UDBParams) => Promise<any> = params =>
  axios.get('/lgn/login/init.do', { params });

export const signUpMember: (params: UDBParams) => Promise<any> = params =>
  axios.get('/reg/registermix/regcore.do', { params });

export const signUpAdmin: (params: UDBParams) => Promise<any> = params =>
  axios.get('/reg/registeradmin/regcore.do', { params });

export const sendSignUpVerificationCode: (
  params: UDBParams,
) => Promise<any> = params =>
  axios.get('/reg/register/sendverifycode.do', { params });

export const checkAccount: (params: UDBParams) => Promise<any> = params =>
  axios.get('/reg/register/checkacct.do', { params });

export const checkResetAccount: (params: UDBParams) => Promise<any> = params =>
  axios.get('/aq/pwd/retrieve/prechk.do', { params });

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

export const loginAccount: (params: UDBParams) => Promise<any> = params =>
  axios.get('/lgn/login/verify.do', { params });
