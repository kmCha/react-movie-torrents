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

import '../css/components/UserLoginModal.less'

class UserLoginModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {
    }

    render() {
        var {
        } = this.state

        return (
            <div className="user-login-modal">
                <UserLoginForm></UserLoginForm>
                <Divider>其他方式登录</Divider>
                <div className="user-login-channel-wrap">
                    <a className="btn-login" href={`https://github.com/login/oauth/authorize?client_id=864a78a52abfc910a2c3&redirect_uri=${apiHost}/auth/github`}>
                        <Icon type="github" theme="filled" />
                        <span>GitHub</span>
                    </a>
                </div>
            </div>
        )
    }
}

export default UserLoginModal