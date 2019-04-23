import React from 'react'
import {
    getUserInfo,
    apiHost
} from '../js/app/api'
import { Icon } from 'antd';

import '../css/components/UserLogin.less'

class UserLogin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            userInfo: null
        }
    }

    componentDidMount() {
        getUserInfo().then(res => {
            if (res.data.code > 0) {
                this.setState({
                    userInfo: res.data.body,
                    loading: false
                })
            } else {
                this.setState({
                    userInfo: null,
                    loading: false
                })
            }
        }).catch(e => {
            this.setState({
                userInfo: null,
                loading: false
            })
        })
    }

    render() {
        var {
            userInfo,
            loading
        } = this.state
        if (loading) {
            return (
                <div className="user-login-wrap">
                    <Icon type="loading" />
                </div>
            )
        }
        if (userInfo) {
            return (
                <div className="user-login-wrap">
                    <a className="userinfo-wrap" href={userInfo.html_url}>
                        <div className="user-avatar" style={{backgroundImage: `url('${userInfo.avatar_url}')`}}></div>
                        <div className="username">{userInfo.login}</div>
                    </a>
                </div>
            )
        } else {
            return (
                <div className="user-login-wrap">
                    <a className="btn-login" href={`https://github.com/login/oauth/authorize?client_id=864a78a52abfc910a2c3&redirect_uri=${apiHost}/auth/github`}>
                        Login
                    </a>
                </div>
            )
        }
    }
}

export default UserLogin