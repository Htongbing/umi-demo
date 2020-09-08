import axios from '@/service'

export const getInitConfig: () => Promise<any> = () => axios.get('/init')