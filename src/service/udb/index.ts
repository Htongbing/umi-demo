import axios from '@/service'
import { UDBParams } from '@/const'

export const getMemberInitConfig: (params: UDBParams) => Promise<any> = params => axios.get('/reg/registermix/init.do', { params })

export const getAdminInitConfig: (params: UDBParams) => Promise<any> = params => axios.get('/reg/registeradmin/init.do', { params })

export const signUpMember: (params: UDBParams) => Promise<any> = params => axios.get('/reg/registermix/regcore.do', { params })

export const signUpAdmin: (params: UDBParams) => Promise<any> = params => axios.get('/reg/registeradmin/regcore.do', { params })