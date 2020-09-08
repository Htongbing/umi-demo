import { defineConfig } from 'umi';

export default defineConfig({
  history: {
    type: 'hash',
  },
  nodeModulesTransform: {
    type: 'none',
  },
  // proxy: {
  //   '/udb': 'http://www.baidu.com'
  // }
});
