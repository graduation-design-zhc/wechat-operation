import React, { Component } from 'react';
import { connect } from 'dva';
import {
    Card,
    Icon,
    List,
    Button,
    Form,
    Input,
    Select,
    Popconfirm,
    Table,
    Divider,
    message,
    Popover,
    Modal,
    Row,
    Col,
    DatePicker,
    Radio
} from 'antd';
import Link from 'umi/link';
import router from "umi/router";
import moment from 'moment';

const Search = Input.Search;

const confirm = Modal.confirm;

const { Option } = Select;

class MemberListPage extends Component {

    state = {
        keyWord: "",
        visible: false,
        dsVisible: false,
        member: [],
        size: 'default',
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
                    if (this.props.flag == true) {
                        message.success("删除成功!");
                    } else if (this.props.flag == true) {
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

    showMoel = (member) => {
        this.setState({
            visible: true,
            member: member,
        });
    }

    handleOk = (e) => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values.birthday);
                this.props.dispatch({
                    type: 'member/updateMember',
                    payload: {
                        "memberId": this.state.member.memberId,
                        "nickName": values.nickName,
                        "gender": values.gender,
                        "birthday": values.birthday,
                        "phone": values.phone,
                    }
                }).then(() => {
                    console.log
                    if (this.props.member != null) {
                        message.success("修改成功!");
                    } else if (this.props.member == null) {
                        message.error("修改失败!")
                    } else {
                        message.error("系统出错")
                    }
                });
            }
        });
        this.setState({
            visible: false,
        });
    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'member/queryMemberList',
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { size } = this.state;
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
                width: 100,
                fixed: 'left'
            },
            {
                title: '头像',
                key: 'avatar',
                dataIndex: 'avatar',
                width: 100,
                render: text => <div><img src={text} style={{width: 50}} ></img></div>
            },
            {
                title: '性别',
                key: 'gender',
                dataIndex: 'gender',
                render: text => <div>{text === 1 ? "男" : "女"}</div>,
            },
            {
                title: '生日',
                key: 'birthday',
                dataIndex: 'birthday',
            },
            {
                title: '手机',
                key: 'phone',
                dataIndex: 'phone',
            },
            {
                title: '会员卡余额',
                key: 'memberBalance',
                dataIndex: 'memberBalance',
            },
            {
                title: '会员卡积分',
                key: 'memberIntegral',
                dataIndex: 'memberIntegral',
            },
            {
                title: '注册时间',
                key: 'createTime',
                dataIndex: 'createTime',
            },
            {
                title: '最后修改时间',
                key: 'updateTime',
                dataIndex: 'updateTime',
            }, {
                title: '操作',
                key: 'action',
                width: 320,
                fixed: 'right',
                render: (text, record) => (
                    <span>
                        <Button type="primary"><Icon type="edit" />充值</Button>
                        <Divider type="vertical" />
                        <Button onClick={() => this.showMoel(record)} type="primary"><Icon type="edit" />编辑</Button>
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
                            scroll={{ x: 1300 }}
                            pagination={{  //分页
                                pageSize: 5,  //显示几条一页
                            }}
                        />
                    </Card>
                }

                <Modal
                    title="编辑"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="确认"
                    cancelText="取消"
                >
                    <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} ref="getFormValue" >
                        <Form.Item
                            label="昵称"
                        >
                            {getFieldDecorator('nickname', {
                                rules: [{ required: true, message: 'Please input your nickName!' }],
                                initialValue: this.state.member.nickname,
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item
                            label="性别"
                        >
                            {getFieldDecorator('gender', {
                                rules: [{ required: true, message: '请选择性别' }],
                                initialValue: this.state.member.gender,
                            })(
                                <Select
                                    placeholder="请选择性别"
                                >
                                    <Option value={1}>男</Option>
                                    <Option value={2}>女</Option>
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item
                            label="生日"
                        >
                            {
                                getFieldDecorator('birthday', {
                                    initialValue: moment(this.state.member.birthday, 'YYYY-MM-DD'),
                                })(
                                    <DatePicker format={'YYYY-MM-DD'} size={size} />
                                )
                            }
                        </Form.Item>
                        <Form.Item
                            label="手机"
                        >
                            {getFieldDecorator('phone', {
                                rules: [{ required: true, message: 'Please input your phone!' }],
                                initialValue: this.state.member.phone,
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item
                            label="注册时间"
                        >
                            {getFieldDecorator('createTime', {
                                initialValue: this.state.member.createTime,
                            })(
                                <Input disabled />
                            )}
                        </Form.Item>
                        <Form.Item
                            label="最后修改时间"
                        >
                            {getFieldDecorator('updateTime', {
                                initialValue: this.state.member.updateTime,
                            })(
                                <Input disabled />
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            </div>

        );
    }
}

function mapStateToProps(state) {

    return {
        memberList: state.member.memberList,
        flag: state.member.flag,
        member: state.member.member
    };
}

export default connect(mapStateToProps)(Form.create()(MemberListPage));
