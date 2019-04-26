import React from 'react'
import {
    apiHost
} from '../js/app/api'
import {
    Icon,
    message,
    Modal,
    Divider
} from 'antd';
import UserLoginForm from './UserLoginForm'
import UserSignUpForm from './UserSignUpForm'

import '../css/components/UserLoginModal.less'

class UserLoginModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showForm: 'login'
        }
    }

    changeForm(type) {
        this.setState({
            showForm: type
        })
    }

    onSignUp(account) {
        this.changeForm('login')
    }

    render() {
        var { showForm } = this.state

        var modalContent = <div className="user-login-modal"></div>

        if (showForm === 'login') {
            modalContent = <div className="user-login-modal">
                <UserLoginForm onChangeForm={this.changeForm.bind(this)} onLoginSuccess={this.props.onLoginSuccess}></UserLoginForm>
                <Divider>其他方式登录</Divider>
                <div className="user-login-channel-wrap">
                    <a className="btn-login" href={`https://github.com/login/oauth/authorize?client_id=864a78a52abfc910a2c3&redirect_uri=${apiHost}/auth/github`}>
                        <Icon type="github" theme="filled" />
                        <span>GitHub</span>
                    </a>
                </div>
            </div>
        }

        if (showForm === 'signUp') {
            modalContent = <div className="user-login-modal">
                <UserSignUpForm onChangeForm={this.changeForm.bind(this)} onSignUp={this.onSignUp.bind(this)}></UserSignUpForm>
            </div>
        }

        return modalContent;
    }
}

export default UserLoginModal