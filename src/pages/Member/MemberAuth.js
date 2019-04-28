import React, { Component } from 'react';
import { connect } from 'dva';

class MemberAuth extends Component {

	componentDidMount() {
	    this.props.dispatch({
	        type: 'member/memberAuthorize',
		});
	}

	render() {
		return (
			<div>

			</div>
		);
	}
}

function mapStateToProps(state) {

    return {
        redirectUrl: state.member.redirectUrl,
    };
}

export default connect(mapStateToProps) (MemberAuth);
