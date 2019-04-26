import React from 'react'
import {
    getUserInfo,
    apiHost,
    userLogOut
} from '../js/app/api'
import {
    Icon,
    message,
    Modal
} from 'antd';
import UserLoginModal from './UserLoginModal'

import '../css/components/UserLogin.less'

class UserLogin extends React.Component {
    constructor(props) {
        super(props)
        this.getUserInfo()
        this.state = {
            loading: true,
            userInfo: null,
            userInfoGitHub: null,
            modalVisible: false
        }
    }

    onLoginSuccess() {
        this.setModalVisible(false);
        this.getUserInfo()
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

    setModalVisible(modalVisible) {
        this.setState({
            modalVisible
        });
    }

    getUserInfo() {
        getUserInfo().then(res => {
            if (res.data.code > 0) {
                this.setState({
                    userInfo: res.data.userInfo,
                    userInfoGitHub: res.data.userInfoGitHub,
                    loading: false
                })
            } else {
                this.setState({
                    userInfo: null,
                    userInfoGitHub: null,
                    loading: false
                })
            }
        }).catch(e => {
            this.setState({
                userInfo: null,
                userInfoGitHub: null,
                loading: false
            })
        })
    }

    render() {
        var {
            userInfo,
            userInfoGitHub,
            loading
        } = this.state

        var comp = <div className="btn-login" onClick={this.setModalVisible.bind(this, true)}>
                        登录
                    </div>

        if (loading) {
            comp = <Icon type="loading" />;
        } else if (userInfo) {
            comp = <div>
                <a className="userInfo-wrap" href="javascript: void 0;">
                    <div className="user-avatar" style={{backgroundImage: `url(${require('../img/avatar.png')})`}}></div>
                    <div className="username">{userInfo.userName}</div>
                </a>
                <div className="btn-logout" onClick={this.logOut.bind(this)}>登出</div>
            </div>
        } else if (userInfoGitHub) {
            comp = <div>
                <a className="userInfo-wrap" href={userInfoGitHub.html_url}>
                    <div className="user-avatar" style={{backgroundImage: `url('${userInfoGitHub.avatar_url}')`}}></div>
                    <div className="username">{userInfoGitHub.login}</div>
                </a>
                <div className="btn-logout" onClick={this.logOut.bind(this)}>登出</div>
            </div>
        }

        return (
            <div className="user-login-wrap">
                {comp}
                <Modal
                    title="登录/注册"
                    centered
                    footer={null}
                    visible={this.state.modalVisible}
                    onOk={() => this.setModalVisible(false)}
                    onCancel={() => this.setModalVisible(false)}
                    >
                    <UserLoginModal onLoginSuccess={this.onLoginSuccess.bind(this)}></UserLoginModal>
                </Modal>
            </div>
        )
    }
}

export default UserLogin