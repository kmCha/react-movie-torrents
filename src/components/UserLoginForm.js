import React from 'react'
import {
    Form, Icon, Input, Button, Checkbox
} from 'antd';
import '../css/components/UserLoginForm.less'

class NormalLoginForm extends React.Component {
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { onChangeForm } = this.props;
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
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        登录
                    </Button>
                    Or <a onClick={() => {onChangeForm('signUp')}} href="javascript: void 0;">立即注册</a>
                </Form.Item>
            </Form>
        );
    }
}

const UserLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default UserLoginForm