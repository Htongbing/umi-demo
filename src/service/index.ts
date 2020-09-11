import axios, { AxiosInstance } from 'axios';
import { AXIOS_BASE_URL } from '@/const';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: AXIOS_BASE_URL,
});

axiosInstance.interceptors.response.use(res => {
  const { data } = res;
  if (data.rescode === '0') {
    return Promise.resolve(data);
  }
  return Promise.reject(data);
});

export default axiosInstance;
