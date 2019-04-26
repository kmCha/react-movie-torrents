import React from 'react'
import {
    Form, Icon, Input, Button, Checkbox, message
} from 'antd';
import {
    networkErrorMsg,
    encryptPassword
} from '../js/app/utils';
import { getUserSalt, userLogin } from '../js/app/api';
import '../css/components/UserLoginForm.less'


class NormalLoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                var { userName, password, remember } = values;

                this.setState({
                    loading: true
                })

                getUserSalt({
                    userName
                }).then(res => {
                    var { code, msg, data } = res.data;
                    if (code === 1) {
                        var salt = data.salt;
                        var { hash } = encryptPassword(password, salt);
                        userLogin({
                            userName,
                            hash,
                            remember
                        }).then(res => {
                            var { code, msg } = res.data;
                            if (code === 1) {
                                message.success(`${userName}，欢迎肥来`);
                                this.props.onLoginSuccess();
                            } else {
                                message.error(msg);
                            }
                            this.setState({
                                loading: false
                            })
                        }).catch(e => {
                            message.error(networkErrorMsg)
                            this.setState({
                                loading: false
                            })
                        })
                    } else {
                        message.error(msg);
                        this.setState({
                            loading: false
                        })
                    }
                }).catch(e => {
                    message.error(networkErrorMsg);
                    this.setState({
                        loading: false
                    })
                })
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { onChangeForm } = this.props;
        const { loading } = this.state;
        var submitBtn = <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.handleSubmit.bind(this)}>
            登录
        </Button>;
        if (loading) {
            submitBtn = <Button type="primary" disabled className="login-form-button">
            <Icon type="loading" />
        </Button>;
        }
        return (
            <Form className="user-login-form">
                <Form.Item>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: '请输入用户名！' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码！' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>记住本次登录</Checkbox>
                    )}
                    <a className="login-form-forgot" href="">忘记密码？</a>
                    {submitBtn}
                    Or <a onClick={() => {onChangeForm('signUp')}} href="javascript: void 0;">立即注册</a>
                </Form.Item>
            </Form>
        );
    }
}

const UserLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default UserLoginForm