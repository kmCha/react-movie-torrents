import React from 'react'
import {
    getUserInfo
} from '../js/app/api'

import '../css/components/UserLogin.less'

class TagList extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            userInfo: null
        }
    }

    componentDidMount() {
        getUserInfo().then(res => {
            this.setState({
                userInfo: res.data.body
            })

            console.log(res)
        })
    }

    render() {
        var {
            userInfo
        } = this.state
        if (userInfo) {
            return (
                <div className="user-login-wrap">
                    <a className="userinfo-wrap" href={userInfo.html_url}>
                        <div className="user-avatar" style={{backgroundImage: `url('${userInfo.avatar_url}')`}}></div>
                        <div className="username">{userInfo.name}</div>
                    </a>
                </div>
            )
        } else {
            return (
                <div className="user-login-wrap">
                    <a className="btn-login" href="https://github.com/login/oauth/authorize?client_id=864a78a52abfc910a2c3&redirect_uri=http://localhost:3000/auth/github">
                        Login
                    </a>
                </div>
            )
        }
    }
}

export default TagList