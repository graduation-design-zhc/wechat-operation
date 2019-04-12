import { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import Link from 'umi/link';

// 引入子菜单组件
const SubMenu = Menu.SubMenu;

export default class BasicLayout extends Component {
  render() {
    return (
        <Layout>
            <Sider width={256} style={{ minHeight: '100vh' }}>
                <div style={{ height: '32px', background: 'rgba(255,255,255,.2)', margin: '16px'}}/>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                <SubMenu
                key="sub1"
                title={<span><Icon type="pie-chart" /><span>会员管理</span></span>}
                >
                <Menu.Item key="1"><Link to="/member/order">会员下单</Link></Menu.Item>
                <Menu.Item key="2"><Link to="/member/recharge">会员充值</Link></Menu.Item>
                <Menu.Item key="3"><Link to="/member/member">会员列表</Link></Menu.Item>
                <Menu.Item key="4"><Link to="/member/orderLog">会员下单记录</Link></Menu.Item>
                <Menu.Item key="5"><Link to="/member/rechargeLog">会员充值记录</Link></Menu.Item>
                </SubMenu>
                <SubMenu
                key="sub2"
                title={<span><Icon type="dashboard" /><span>微信管理</span></span>}
                >
                <Menu.Item key="a"><Link to="/basic/analysis">菜单管理</Link></Menu.Item>
                <Menu.Item key="b"><Link to="/basic/monitor">关注列表</Link></Menu.Item>
                <Menu.Item key="c"><Link to="/basic/workplace">待续</Link></Menu.Item>
                </SubMenu>
            </Menu>
            </Sider>
            <Layout >
                <Header style={{ background: '#fff', textAlign: 'center', padding: 0 }}>Header</Header>
                <Content style={{ margin: '24px 16px 0' }}>
                <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                {this.props.children}
                </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    )
  }
}