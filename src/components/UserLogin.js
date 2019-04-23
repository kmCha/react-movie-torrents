import React from 'react'
import {
    getUserInfo,
    apiHost,
    userLogOut
} from '../js/app/api'
import {
    Icon,
    message
} from 'antd';

import '../css/components/UserLogin.less'

class UserLogin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            userInfo: null
        }
    }

    logOut() {
        this.setState({
            ...this.state,
            loading: true
        })
        userLogOut().then(res => {
            if (res.data.code > 0) {
                window.location.reload()
            } else {
                message.error(res.data.msg)
            }
        }).catch(e => {
            message.error('哦豁，登出失败')
        })
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
                    <div className="btn-logout" onClick={this.logOut.bind(this)}>[exit]</div>
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