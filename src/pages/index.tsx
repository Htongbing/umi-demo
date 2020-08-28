import React from 'react';
import styles from './index.less';
import { Button } from 'antd';
import { Link, history } from 'umi';

export default (): React.ReactNode => (
  <div className={styles['button-container']}>
    <Link to="/login">
      <Button block>点击登录</Button>
    </Link>
    <Button className={styles['last-ant-btn']} block onClick={(): void => history.push('/login')}>点击登录</Button>
  </div>
)
