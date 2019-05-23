import React, { Component } from 'react';
import { connect } from 'dva';
import {
    Card,
    Icon,
    Button,
    Form,
    Input,
    Select,
    Table,
    Divider,
    message,
    Modal,
    DatePicker,
    InputNumber
} from 'antd';
import moment from 'moment';


const Search = Input.Search;

class OrderLogPage extends Component {

    state = {
        visible: false,
        orderLog: {
            orderDetailDTOList: [],
            orderId: null,
            buyerPhone: null,
            nickname: null,
            operator: null,
            createTime: null,
            orderIntegral: null,
            orderPrice: null,
            payType: null,
        },
    }

    handleOk = () => {
        this.setState({
            visible: false,
        })
    }

    handleCancel = () => {
        this.setState({
            visible: false,
        })
    }

    handleSearch = (value) => {
        this.props.dispatch({
            type: 'member/getOrderLogListByPhone',
            payload: value,
        })
    }

    queryOrderLogList = () => {
        this.props.dispatch({
            type: 'member/getOrderLogList',
        });
    }

    showDetailModel = (orderLog) => {
        this.setState({
            visible: true,
            orderLog: orderLog,
        });
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'member/getOrderLogList',
        });
    }

    render() {
        const extraContent = (
            <div>
                <Form style={{ marginTop: "20px" }}>
                    <Form.Item>
                        <div>
                            <Icon type="align-left" onClick={() => this.queryOrderLogList()} />全部
                            <Search
                                placeholder="输入手机号查询"
                                onSearch={value => this.handleSearch(value)}
                                style={{ width: 400, marginLeft: "10px" }}
                                enterButton
                            />
                        </div>
                    </Form.Item>
                </Form>
            </div>
        );

        const columns = [
            {
                title: '订单编号',
                key: 'orderId',
                dataIndex: 'orderId',
            },
            {
                title: '购买商品',
                key: 'orderDescribe',
                dataIndex: 'orderDescribe',
            },
            {
                title: '购买人',
                key: 'nickname',
                dataIndex: 'nickname',
            },
            {
                title: '手机',
                key: 'buyerPhone',
                dataIndex: 'buyerPhone',
            },
            {
                title: '支付方式',
                key: 'payType',
                dataIndex: 'payType',
                render: text => <div>{text === 0 ? "会员支付" : "现金支付"}</div>,
            },
            {
                title: '订单总价',
                key: 'orderPrice',
                dataIndex: 'orderPrice',
            },
            {
                title: '订单积分',
                key: 'orderIntegral',
                dataIndex: 'orderIntegral',
            },
            {
                title: '操作人',
                key: 'operator',
                dataIndex: 'operator',
            },
            {
                title: '购买时间',
                key: 'createTime',
                dataIndex: 'createTime',
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <Button type="primary" onClick={() => this.showDetailModel(record)}>详情</Button>
                    </span>
                ),
            },
        ];

        const detailColumns = [
            {
                title: '商品名称',
                key: 'productName',
                dataIndex: 'productName',
            }, 
            {
                title: '商品单价',
                key: 'productPrice',
                dataIndex: 'productPrice',
            }, 
            {
                title: '购买数量',
                key: 'productCount',
                dataIndex: 'productCount',
            },
        ]

        return (

            <div>

                {
                    <Card
                        bordered={true}
                        title="会员下单记录"
                        style={{ marginTop: 24 }}
                        bodyStyle={{ padding: '0px 32px 40px 32px' }}
                        extra={extraContent}
                    >
                        <Table
                            bordered
                            columns={columns}
                            dataSource={this.props.orderLogList}
                            style={{ minHeight: '625px' }}
                            rowKey={record => record.orderId}
                            pagination={{  //分页
                                pageSize: 5,  //显示几条一页
                            }}
                        />
                    </Card>
                }

                <Modal
                    title="商品详情"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="关闭"
                    cancelText="取消"
                >
                    <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} >
                        订单编号：{this.state.orderLog.orderId}
                        <br />
                        商品详情：
                        <Table columns={detailColumns} dataSource={this.state.orderLog.orderDetailDTOList} size="small" />
                        购买人：{this.state.orderLog.nickname}
                        <br />
                        手机：{this.state.orderLog.buyerPhone}
                        <br />
                        支付方式：{this.state.orderLog.payType == 1 ? "现金支付" : "会员卡支付"}
                        <br />
                        订单总价：{this.state.orderLog.orderPrice}
                        <br />
                        订单积分：{this.state.orderLog.orderIntegral}
                        <br />
                        操作人：{this.state.orderLog.operator}
                        <br />
                        购买时间：{this.state.orderLog.createTime}
                    </Form>
                </Modal>
            </div>

        );


    }

}

function mapStateToProps(state) {

    return {
        orderLogList: state.member.orderLogList,
    };
}

export default connect(mapStateToProps)(Form.create()(OrderLogPage));