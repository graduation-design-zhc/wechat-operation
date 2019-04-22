import React, { Component } from 'react';
import { connect } from 'dva';
import {
    Card,
    Icon,
    List,
    Button,
    Form,
    Input,
    Popconfirm,
    Table,
    Divider,
    message,
    Popover,
    Modal,
    Row,
    Col
} from 'antd';
import Link from 'umi/link';
import router from "umi/router";

const Search = Input.Search;

const confirm = Modal.confirm;

class MemberListPage extends Component {

    state = {
        keyWord: "",
        visible: false,
        dsVisible: false,
    }

    showDeleteConfirm = (memberId) => {
        confirm({
            title: '确定删除?',
            content: '删除后不可恢复!',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk: () => {
                this.props.dispatch({
                    type: 'member/deleteMemberByMemberId',
                    payload: memberId,
                }).then(() => {
                    console.log(this.props.flag);
                    if (this.props.flag == true) {
                        message.success("删除成功!");
                        console.log('删除成功!');
                    } else if (this.props.flag == false) {
                        message.error("删除失败!")
                    } else {
                        message.error("系统出错")
                    }
                });
            },
            onCancel() {
            },
        });
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'member/queryMemberList',
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
                key: 'nickName',
                dataIndex: 'nickName',
                width: "10%",
            },
            {
                title: '性别',
                key: 'gender',
                dataIndex: 'gender',
                width: "10%",
                render: text => <div>{text === 1 ? "男" : "女"}</div>,
            },
            {
                title: '生日',
                key: 'birthday',
                dataIndex: 'birthday',
                width: "15%",
            },
            {
                title: '手机',
                key: 'phone',
                dataIndex: 'phone',
                width: "10%",
            },
            {
                title: '注册时间',
                key: 'createTime',
                dataIndex: 'createTime',
                width: "15%",
            },
            {
                title: '最后修改时间',
                key: 'updateTime',
                dataIndex: 'updateTime',
                width: "15%",
            }, {
                title: '操作',
                key: 'action',
                width: "25%",
                render: (text, record) => (
                    <span>
                        <Button type="primary"><Icon type="edit" />编辑</Button>
                        <Divider type="vertical" />
                        <Button onClick={() => this.showDeleteConfirm(record.memberId)} type="danger"><Icon type="delete" />删除</Button>
                    </span>
                ),
            },
        ];

        return (

            <div>

                {
                    <Card
                        bordered={true}
                        title="会员列表"
                        style={{ marginTop: 24 }}
                        bodyStyle={{ padding: '0px 32px 40px 32px' }}
                        extra={extraContent}
                    >
                        <Table
                            bordered
                            columns={columns}
                            dataSource={this.props.memberList}
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
        memberList: state.member.memberList,
        flag: state.member.flag,
    };
}

export default connect(mapStateToProps)(Form.create()(MemberListPage));
