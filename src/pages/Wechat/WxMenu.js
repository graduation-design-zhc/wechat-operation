import React, { Component } from 'react';
import { connect } from 'dva';
import {
    Card,
    Icon,
    Button,
    Form,
    Input,
    Avatar,
    Select,
    Table,
    Modal,
    message,
    Divider,
    InputNumber,
    Typography,
    Row,
    Col
} from 'antd';
import Link from 'umi/link';
import router from "umi/router";
import moment from 'moment';
import { stat } from 'fs';


const Search = Input.Search;

const Option = Select.Option;


class WxMenuPage extends Component {

    state = {
        visible: false,
        menuList: [],
    }

    showModel = () => {
        this.setState({
            visible: true,
        })
    }

    handleCancel = () => {
        this.setState({
            visible: false,
        })
    }

    handleOk = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const menu = {
                    type: values.type,
                    name: values.name,
                    url: values.url
                }
                this.props.dispatch({
                    type: 'wechat/createMenu',
                    payload: this.state.menuList.concat(menu)
                }).then(() => {
                    if (this.props.flag == true) {
                        message.success("修改成功!");
                    } else if (this.props.flag == false) {
                        message.error("修改失败!")
                    } else if (this.props.flag == null) {
                        message.error("系统出错")
                    }
                });
            }
        });
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'wechat/getMenuList',
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        const columns = [
            {
                title: '菜单名称',
                key: 'name',
                dataIndex: 'name',
            },
            {
                title: '菜单级别',
                key: 'menuLevel',
                dataIndex: 'menuLevel',
            },
            {
                title: '菜单类型',
                key: 'type',
                dataIndex: 'type',
            },
            {
                title: '菜单链接',
                key: 'url',
                dataIndex: 'url',
            },
        ];
        return (
            <div>
                <Button type="primary" onClick={() => this.showModel()}>添加菜单</Button>
                <Divider />
                <Table
                    columns={columns}
                    dataSource={this.props.menuList}
                    style={{ minHeight: '625px' }}
                    pagination={{  //分页
                        pageSize: 5,  //显示几条一页
                    }}
                />
                <Modal
                    title="一级菜单"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="确认"
                    cancelText="取消"
                >
                    <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} ref="getFormValue" >
                        {/* 级别：<Select
                            showSearch
                            style={{ width: 200 }}
                            placeholder="菜单级别"
                            optionFilterProp="children"
                            // onChange={key => this.getProductByCategoryType(key)}
                            // onFocus={onFocus}
                            // onBlur={onBlur}
                            // onSearch={onSearch}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            <Option value="0">一级菜单</Option>
                            <Option value="1">二级菜单</Option>
                        </Select> */}
                        <Form.Item
                            label="名称"
                        >
                            {getFieldDecorator('name', {
                                // initialValue: ,
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item
                            label="类型"
                        >
                            {getFieldDecorator('type', {
                                // initialValue: this.props.member.gender,
                            })(
                                <Select
                                    placeholder="请选择类型"
                                >
                                    <Option value="view">view</Option>
                                    <Option value="click">click</Option>
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item
                            label="链接"
                        >
                            {getFieldDecorator('url', {
                                // initialValue: ,
                            })(
                                <Input />
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
        menuList: state.wechat.menuList,
        flag: state.wechat.flag
    };
}

export default connect(mapStateToProps)(Form.create()(WxMenuPage));
