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
	Modal,
	message,
	Row,
	Col,
	DatePicker,
	Radio
} from 'antd';
import Link from 'umi/link';
import router from "umi/router";
import moment from 'moment';

class MemberHome extends Component {

	handleOk = (e) => {
		this.props.form.validateFields((err, values) => {
			if (!err) {
				this.props.dispatch({
					type: 'member/updateMember',
					payload: {
						"memberId": this.props.member.memberId,
						"phone": values.phone
					}
				}).then(() => {
				    if (this.props.isBandPhone == false ) {
				        message.success("绑定成功!");
				    } else if (this.props.isBandPhone == true) {
				        message.error("绑定失败!")
				    } else {
				        message.error("系统出错")
				    }
				});
			}
		});

	}

	componentDidMount() {
		this.props.dispatch({
			type: 'member/getMemberByOpenId',
			payload: this.props.location.query.openId,
		});
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<div>
				<div>
				</div>
				<Modal
					title="您还未绑定手机，请绑定！"
					visible={this.props.isBandPhone}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
					footer={null}
					keyboard={false}
					centered={true}
					closable={false}
					maskClosable={false}
					width={300}
				// okText="绑定"
				>
					<Form labelCol={{ span: 1 }} wrapperCol={{ span: 100 }}>
						<Form.Item
						>
							{getFieldDecorator('phone', {
								rules: [{ required: true, message: 'Please input your phone!' }],
							})(
								<Input />
							)}
						</Form.Item>
						<Form.Item>
							<Button type="primary" onClick={() => this.handleOk()}>绑定</Button>
						</Form.Item>
					</Form>
				</Modal>
			</div>

		);
	}
}

function mapStateToProps(state) {

	return {
		member: state.member.member,
		isBandPhone: state.member.isBandPhone,
	};
}

export default connect(mapStateToProps)(Form.create()(MemberHome));
