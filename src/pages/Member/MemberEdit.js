import React, { Component } from 'react';
import { connect } from 'dva';
import {
    Card,
    Icon,
    Button,
    Form,
    Input,
    Avatar,
    Table,
    Modal,
    message,
    Divider,
    DatePicker,
    Select,
    Checkbox,
    Typography
} from 'antd';
import Link from 'umi/link';
import router from "umi/router";
import moment from 'moment';

const { Option } = Select;

class MemberEdit extends Component {

    handleSubmit = (e) => {
        console.log(1)
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.dispatch({
                    type: 'member/updateMember',
                    payload: {
                        "memberId": this.props.member.memberId,
                        "nickname": values.nickname,
                        "gender": values.gender,
                        "birthday": values.birthday,
                        "phone": values.phone,
                    }
                }).then(() => {
                    if (this.props.member != null) {
                        message.success("修改成功!");
                        router.push({pathname: '/auth/member', query: {openId: this.props.member.openId}});
                    } else if (this.props.member == null) {
                        message.error("修改失败!")
                    } else {
                        message.error("系统出错")
                    }
                });
            }
        });
    }

    state = {
        size: 'default',
    }


    componentDidMount() {
        this.props.dispatch({
            type: 'member/getMemberByMemberId',
            payload: this.props.location.payload.memberId,
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { size } = this.state;
        return (
            <div>
                <Form className="login-form" style={{ padding: 20 }}>
                    <Card title="编辑" bordered={false}>
                        <Form.Item
                            label="昵称"
                        >
                            {getFieldDecorator('nickname', {
                                initialValue: this.props.member.nickname,
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item
                            label="性别"
                        >
                            {getFieldDecorator('gender', {
                                initialValue: this.props.member.gender,
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
                                    initialValue: moment(this.props.member.birthday, 'YYYY-MM-DD'),
                                })(
                                    <DatePicker format={'YYYY-MM-DD'} size={size} />
                                )
                            }
                        </Form.Item>
                        <Form.Item
                            label="手机"
                        >
                            {getFieldDecorator('phone', {
                                initialValue: this.props.member.phone,
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" onClick={() => this.handleSubmit()} className="login-form-button">
                                保存
          </Button>
                        </Form.Item>
                    </Card>
                </Form>
            </div>

        );
    }
}

function mapStateToProps(state) {
    return {
        member: state.member.member,
    };
}

export default connect(mapStateToProps)(Form.create()(MemberEdit));
