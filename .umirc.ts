import { defineConfig } from 'umi';

export default defineConfig({
  history: {
    type: 'hash',
  },
  nodeModulesTransform: {
    type: 'none',
  },
  proxy: {
    '/reg': {
      target: 'https://test-aurogon-login.yy.com/',
      changeOrigin: true,
    },
    '/lgn': {
      target: 'https://test-aurogon-login.yy.com/',
      changeOrigin: true,
    },
  },
});
