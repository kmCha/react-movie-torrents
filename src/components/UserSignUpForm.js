import React from 'react'

import {
    Form, Input, Icon, Button
} from 'antd';

import '../css/components/UserSignUpForm.less';

class RegistrationForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            confirmDirty: false,
            autoCompleteResult: [],
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    handleConfirmBlur(e) {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    compareToFirstPassword(rule, value, callback) {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次输入密码不一致！');
        } else {
            callback();
        }
    }

    validateToNextPassword(rule, value, callback) {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { onChangeForm } = this.props;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 18 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 18,
                    offset: 6,
                },
            },
        };

        return (
            <Form onSubmit={this.handleSubmit.bind(this)} className="user-sign-up-wrap">
                <Form.Item {...formItemLayout} label="用户名">
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: '请输入用户名！' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
                    )}
                </Form.Item>
                <Form.Item {...formItemLayout} label="密码">
                    {getFieldDecorator('password', {
                        rules: [{
                            required: true, message: '请输入密码！',
                        }, {
                            validator: this.validateToNextPassword.bind(this),
                        }],
                    })(
                        <Input type="password" />
                    )}
                </Form.Item>
                <Form.Item {...formItemLayout} label="确认密码">
                    {getFieldDecorator('confirm', {
                        rules: [{
                            required: true, message: '请确认密码！',
                        }, {
                            validator: this.compareToFirstPassword.bind(this),
                        }],
                    })(
                        <Input type="password" onBlur={this.handleConfirmBlur.bind(this)} />
                    )}
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">注册</Button>
                    <a className="btn-login" href="javascript: void 0;" onClick={() => {onChangeForm('login')}}>已有账号，立即登录</a>
                </Form.Item>
            </Form>
        );
    }
}

const UserSignUpForm = Form.create({ name: 'register' })(RegistrationForm);

export default UserSignUpForm;