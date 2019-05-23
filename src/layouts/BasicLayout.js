import { Component } from 'react';
import { Layout, Menu, Icon, Dropdown } from 'antd';
import styles from './BasicLayout.less';
import Link from 'umi/link';

const { Header, Footer, Sider, Content } = Layout;
// 引入子菜单组件
const SubMenu = Menu.SubMenu;

const menu = (
  <Menu>
    <Menu.Item key='-1'>
      <a onClick={(e) => {
        e.preventDefault();
        localStorage.clear();
        router.push("/user");
      }}>注销</a>
    </Menu.Item>
  </Menu>
);

export default class BasicLayout extends Component {

  state = {
    collapsed: false,
    show: "inline-block",
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
    if (this.state.collapsed == true) {
      this.setState({
        show: "inline-block",
      });
    }
    else {
      this.setState({
        show: "none",
      });
    }
  };

  render() {
    const show = this.state.show;
    return (
      <Layout>
        <Sider width={256} style={{ minHeight: '100vh' }} trigger={null} collapsible collapsed={this.state.collapsed}>
          <div style={{ margin: 10 }}>
            <img
              src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
              alt="logo"
              style={{
                height: "40px",
                verticalAlign: "middle",
                marginRight: "16px",
                marginTop: "-3px",
              }}
            />
            <span style={{ color: "white", display: show }}>
              微信会员管理
            </span>
          </div>


          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <SubMenu
              key="sub1"
              title={<span><Icon type="pie-chart" /><span>会员管理</span></span>}
            >
              <Menu.Item key="1"><Link to="/member/order">会员下单</Link></Menu.Item>
              <Menu.Item key="3"><Link to="/member/list">会员列表</Link></Menu.Item>
              <Menu.Item key="4"><Link to="/member/orderLog">会员下单记录</Link></Menu.Item>
              <Menu.Item key="5"><Link to="/member/rechargeLog">会员充值记录</Link></Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={<span><Icon type="dashboard" /><span>微信管理</span></span>}
            >
              <Menu.Item key="a"><Link to="/member/wxmenu">菜单管理</Link></Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout >
          <Header className={styles.header} style={{ fontSize: "16px", fontWeight: 'bold', background: '#fff' }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
            <div style={{ float: 'right' }}>
              <Dropdown overlay={menu}>
                <a className="ant-dropdown-link" href="#" style={{ height: "50px" }}>
                  <Icon type="user" /> {localStorage.getItem("userName")}
								</a>
              </Dropdown>
            </div>
          </Header>
          <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              {this.props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>WeChat membership management system ©2018 Created by Zhc Graduation Design</Footer>
        </Layout>
      </Layout>
    )
  }
}