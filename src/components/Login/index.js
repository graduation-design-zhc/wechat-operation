import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Tabs } from 'antd';
import classNames from 'classnames';
import LoginItem from './LoginItem';
import LoginSubmit from './LoginSubmit';
import styles from './index.less';
import LoginContext from './loginContext';

class Login extends Component {
  static propTypes = {
    className: PropTypes.string,
    onSubmit: PropTypes.func,
  };

  static defaultProps = {
    className: '',
    onSubmit: () => {},
  };

  constructor(props) {
    super(props);
  }

  getContext = () => {
    const { form } = this.props;
    return {
      form,
    };
  };

  handleSubmit = e => {
    e.preventDefault();
    const { form, onSubmit } = this.props;
    form.validateFields( { force: true }, (err, values) => {
      onSubmit(err, values);
    });
  };

  render() {
    const { className, children } = this.props;
    const TabChildren = [];
    React.Children.forEach(children, item => {
      if (!item) {
        return;
      }
      TabChildren.push(item);
    });
    return (
      <LoginContext.Provider value={this.getContext()}>
        <div className={classNames(className, styles.login)}>
          <Form onSubmit={this.handleSubmit}>
            <React.Fragment>
                {TabChildren}
            </React.Fragment>
          </Form>
        </div>
      </LoginContext.Provider>
    );
  }
}

Login.Submit = LoginSubmit;
Object.keys(LoginItem).forEach(item => {
  Login[item] = LoginItem[item];
});

export default Form.create()(Login);
