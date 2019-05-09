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
	Typography
} from 'antd';
import Link from 'umi/link';
import router from "umi/router";
import moment from 'moment';
import styles from './MemberHome.less';

const { Meta } = Card;

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
					if (this.props.isBandPhone == false) {
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

	editInfo = (memberId) => {
		router.push({pathname: '/auth/member/edit', payload: {memberId: memberId}});
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
				<div className={styles.main}>
					<Card
						cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
						actions={[<Icon type="edit" onClick={() => this.editInfo(this.props.member.memberId)} />]}
					>
						<Meta
							avatar={<Avatar src={this.props.member === null ? null : this.props.member.avatar} />}
							title={this.props.member === null ? '' : this.props.member.nickname}
							description={this.props.member === null ? '余额：0.0' : '余额：' + this.props.member.memberBalance + ' 积分：' + this.props.member.memberIntegral}
						/>
					</Card>
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
