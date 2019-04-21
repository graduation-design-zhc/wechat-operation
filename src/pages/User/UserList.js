import React, { Component } from 'react';
import { Table } from 'antd';
import { connect } from 'dva';

const namespace = 'user';

const mapStateToProps = (state) => {
    const userList = state[namespace].data;
    return {
        userList,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onDidMount: () => {
            dispatch({
                type: `${namespace}/queryUserList`,
            });
        },
    };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class PuzzleCardsPage extends Component {
    componentDidMount() {
        this.props.onDidMount;
    }
    render() {
        return (
            <div>
                {
                    this.props.userList.map(user => {
                        return (
                            <Card key={user.uid}>
                                <div>Q: {user.userName}</div>
                                <div>
                                    <strong>A: {user.createTime} {user.updateTime}</strong>
                                </div>
                            </Card>
                        );
                    })
                }
                <div>hello</div>
            </div>
        );
    }
}