import React, { Fragment } from 'react';
import Link from 'umi/link';
import { Icon } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';
import styles from './UserLayout.less';
import logo from '../assets/logo.jpg';

const copyright = (
  <Fragment>
    Copyright <Icon type="copyright" /> 2019 微信会员管理后台
  </Fragment>
);

class UserLayout extends React.PureComponent {


  render() {
    const { children } = this.props;

    return (

      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
                <img alt="logo" className={styles.logo} src={logo} />
                <span className={styles.title}>微信会员管理后台</span>
            </div>
            <div className={styles.desc}>微信会员管理后台</div>
          </div>
          {children}
        </div>
        <GlobalFooter copyright={copyright} />
      </div>
    );
  }
}

export default UserLayout;
