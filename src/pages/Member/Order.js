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
import styles from './MemberHome.less';
import { stat } from 'fs';


const Search = Input.Search;

const Option = Select.Option;


class OrderPage extends Component {

	state = {
		visible: false,
		payType: 0,
		phone: '',
		count: 1,
		orderDetailRequests: [],
	}

	handleOk = (e) => {
		this.setState({
			visible: false,
		});
		const orderDetailRequest = {
			productId: this.props.product.productId,
			productName: this.props.product.productName,
			productCount: this.state.count
		}
		this.setState({
			orderDetailRequests: this.state.orderDetailRequests.concat(orderDetailRequest)
		});
	}

	handleCancel = (e) => {
		this.setState({
			visible: false,
		});
	}

	showModel = () => {
		this.props.dispatch({
			type: 'product/getCategoryList',
		})
		console.log(this.props.productCategoryList);
		this.setState({
			visible: true,
		});
	}

	confirmOrder = () => {
		const orderRequest = {
			buyerPhone: this.props.member.phone,
			payType: this.state.payType,
			orderDetailRequests: this.state.orderDetailRequests
		}
		this.props.dispatch({
			type: 'member/order',
			payload: orderRequest,
		}).then(() => {
			if (this.props.flag == true) {
				message.success("购买成功！");
				this.setState({
					orderDetailRequests: [],
				});
			} else if (this.props.flag == false) {
				message.error("购买失败，余额不足，请充值！");
			} else if (this.props.flag == null) {
				message.error("系统错误！");
			}

		});
	}

	payOnBlur = (val) => {
		this.setState({
			payType: val
		})
	}

	getMemberByPhone = (phone) => {
		this.setState({
			phone: phone
		});
		this.props.dispatch({
			type: 'member/getMemberByPhone',
			payload: phone,
		}).then(() => {
			if (this.props.member == null) {
				message.error("手机号错误！");
			}
		});
	}

	getProductByCategoryType = (key) => {
		this.props.dispatch({
			type: 'product/getProductListByCategoryType',
			payload: key,
		});
	}

	getProductById = (key) => {
		this.props.dispatch({
			type: 'product/getProductByProductId',
			payload: key
		})
	}

	countChange = (value) => {
		this.setState({
			count: value,
		})
	}

	componentDidMount() {
		this.props.dispatch({
			type: 'product/getCategoryList',
		});
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<div>
				<Button type="primary" onClick={() => this.showModel()}>商品下单</Button>
				<Divider />
				<Row>
					<Col span={12}>
						<div>
							<span style={{ fontSize: "15px", fontWeight: "bold" }}>选购商品：</span>
							{
								this.state.orderDetailRequests.map(orderDetailRequest => {
									return (
										<div key={orderDetailRequest.productId}>{orderDetailRequest.productName} 数量：{orderDetailRequest.productCount}</div>
									)
								})
							}
							<br />
							<br />
							<span style={{ fontSize: "15px", fontWeight: "bold" }}>付款方式：</span> <Select
								showSearch
								style={{ width: 200 }}
								placeholder="付款方式"
								optionFilterProp="children"
								onBlur={value => this.payOnBlur(value)}
								filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
							>
								<Option value="0">会员卡支付</Option>
								<Option value="1">现金支付</Option>
							</Select>
							<br />
							<br />
							<span style={{ fontSize: "15px", fontWeight: "bold" }}>会员手机：</span>
							<Search
								placeholder="手机号搜索"
								onSearch={value => this.getMemberByPhone(value)}
								style={{ width: 200 }}
							/>
							<br />
							<br />
							<Button type="primary" onClick={() => this.confirmOrder()}>购买</Button>
						</div>
					</Col>
					<Col span={12}>
						<h3>会员信息</h3>
						昵称：{this.props.member.nickname}
						<br />
						<br />
						手机：{this.props.member.phone}
						<br />
						<br />
						余额：{this.props.member.memberBalance}
						<br />
						<br />
						积分：{this.props.member.memberIntegral}
					</Col>
				</Row>

				<Modal
					title="商品添加"
					visible={this.state.visible}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
					okText="确认"
					cancelText="取消"
				>
					<Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} ref="getFormValue" >
						商品类别：<Select
							showSearch
							style={{ width: 200 }}
							placeholder="商品类别"
							optionFilterProp="children"
							onChange={key => this.getProductByCategoryType(key)}
							// onFocus={onFocus}
							// onBlur={onBlur}
							// onSearch={onSearch}
							filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
						>
							{
								this.props.productCategoryList.map(category => {
									return (
										<Option key={category.categoryType}>{category.categoryName}</Option>
									);
								})
							}
						</Select>
						<br />
						<br />
						商品名称：<Select
							showSearch
							style={{ width: 200 }}
							placeholder="商品名称"
							optionFilterProp="children"
							onChange={key => this.getProductById(key)}
							filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
						>
							{
								this.props.productList.map(product => {
									return (
										<Option key={product.productId}>{product.productName}</Option>
									);
								})
							}
						</Select>
						<br />
						<br />
						购买数量：<InputNumber min={1} max={10} onChange={this.countChange} defaultValue="1" />
					</Form>
				</Modal>
			</div>
		);
	}
}

function mapStateToProps(state) {

	return {
		member: state.member.member,
		flag: state.member.flag,
		productCategoryList: state.product.productCategoryList,
		productList: state.product.productList,
		product: state.product.product,
	};
}

export default connect(mapStateToProps)(Form.create()(OrderPage));
