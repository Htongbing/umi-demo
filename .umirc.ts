import { defineConfig } from 'umi';

export default defineConfig({
  history: {
    type: 'hash'
  },
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/login', component: '@/pages/login' },
    { path: '/admin', component: '@/pages/admin' },
    { path: '/member', component: '@/pages/member' },
    { path: '/dash', component: '@/pages/dash' },
    { path: '/reset', component: '@/pages/reset' },
    { path: '/change', component: '@/pages/change' }
  ],
});
