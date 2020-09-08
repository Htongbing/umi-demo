import axios, { AxiosInstance } from 'axios'
import { AXIOS_BASE_URL } from '@/const'

const axiosInstance: AxiosInstance = axios.create({
  baseURL: AXIOS_BASE_URL
})

axiosInstance.interceptors.response.use(res => Promise.resolve(res.data))

export default axiosInstance