import React from 'react';
import { Spin } from 'antd';
import { githubAuth } from '../js/app/api.js';

var timer = '';
class Github extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '登录中'
        }
    }

    setTitle() {
        var title = this.state.title;
        if (title.length >= 6) {
            document.title = title.substr(0, 3);
            this.setState({
                title: title.substr(0, 3)
            })
        } else {
            document.title = title + '.';
            this.setState({
                title: title + '.'
            })
        }
    }

    componentWillMount() {
        timer = setInterval(this.setTitle.bind(this), 300);
        githubAuth().then(res => {
            window.location.replace('./index.html');
        }).catch(() => {
            window.location.replace('./index.html');
        });
    }

    componentWillUnmount() {
        clearInterval(timer);
    }

    render() {
        var { title } = this.state;
        return (
            <div className="loading">
                <Spin />
                <div>{title}</div>
            </div>
        )
    }
}

export default Github