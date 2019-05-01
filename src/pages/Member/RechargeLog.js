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

class RechargeLogPage extends Component {

    state = {
        keyWord: "",
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'member/getCardLogList',
        });
    }

    render() {
        const extraContent = (
            <div>
                <Form style={{ marginTop: "20px" }}>
                    <Form.Item>
                        <div>
                            <Icon type="align-left" />{this.state.keyWord === "" ? "全部" : this.state.keyWord}
                            <Search
                                placeholder="请输入关键字查询"
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
                title: '昵称',
                key: 'nickname',
                dataIndex: 'nickname',
            },
            {
                title: '头像',
                key: 'avatar',
                dataIndex: 'avatar',
                render: text => <div><img src={text} style={{width: 50}} ></img></div>
            },
            {
                title: '手机',
                key: 'phone',
                dataIndex: 'phone',
            },
            {
                title: '充值金额',
                key: 'addBalance',
                dataIndex: 'addBalance',
            },
            {
                title: '充值时间',
                key: 'createTime',
                dataIndex: 'createTime',
            },
            {
                title: '操作人',
                key: 'operator',
                dataIndex: 'operator',
            },
        ];
        

        return (

            <div>

                {
                    <Card
                        bordered={true}
                        title="会员卡充值记录"
                        style={{ marginTop: 24 }}
                        bodyStyle={{ padding: '0px 32px 40px 32px' }}
                        extra={extraContent}
                    >
                        <Table
                            bordered
                            columns={columns}
                            dataSource={this.props.memberCardLogList}
                            style={{ minHeight: '625px' }}
                            rowKey={record => record.memberId}
                            pagination={{  //分页
                                pageSize: 5,  //显示几条一页
                            }}
                        />
                    </Card>
                }
            </div>

        );


    }

}

function mapStateToProps(state) {

    return {
        memberCardLogList: state.member.memberCardLogList,
    };
}

export default connect(mapStateToProps)(Form.create()(RechargeLogPage));