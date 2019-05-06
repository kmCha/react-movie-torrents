import React from 'react'
import {
	Drawer,
	Rate
} from 'antd'

import {
	getTorrents
} from '../js/app/api'

import '../css/components/MovieDetail.less'

export default class MovieDetail extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			downloadList: null
		}
	}

	componentWillMount() {
		var { id } = this.props.item;
		getTorrents({ id }).then(res => {
			var { code, body } = res.data;
			if (code > 0) {
				this.setState({
					downloadList: body
				})
			} else if (code === -1) {
				this.setState({
					downloadList: null
				})
			} else {
				this.setState({
					downloadList: []
				})
			}
		})
	}

	render() {
		var { item, onDetailClose, visible } = this.props
		var { downloadList } = this.state

		var doubanLink = '暂无'
		if (item.doubanLink) {
			doubanLink = <a href={item.doubanLink} target="_blank">{item.doubanLink}</a>
		}

		var torrentTitle = <div className="info-title">种子：</div>
		var torrentList = null
		if (downloadList === null) {
			torrentList = <p className="info-msg">请登录后查看</p>
		} else if (downloadList && downloadList.length > 0) {
			torrentList = downloadList.map((downloadItem, index) => {
				return (
					<p className="movie-download-item" key={index}>
						<a href={downloadItem.href} target="_blank">{downloadItem.title}</a>
					</p>
				)
			})
		} else {
			torrentList = <p className="info-msg">该电影暂无资源</p>
		}

		return (
			<Drawer
				title={item.title}
				width="800"
				placement="right"
				onClose={onDetailClose}
				visible={visible}>
				<div className="info-wrap">
					<div className="info-group">
						<span className="title">豆瓣评分：</span>
						<span className="content">{item.doubanScore}<Rate disabled value={item.doubanScore / 2} /></span>
					</div>
					<div className="info-group">
						<span className="title">豆瓣链接：</span>
						<span className="content">{doubanLink}</span>
					</div>
					<div className="info-group">
						<span className="title">上映日期：</span>
						<span className="content">{item.releaseDate}</span>
					</div>
					<div className="info-group">
						<span className="title">大陆上映：</span>
						<span className="content">{item.releaseInChina ? '是' : '否'}</span>
					</div>
					<div className="info-group">
						<span className="title">分类标签：</span>
						<span className="content">{(item.tags || []).join(',')}</span>
					</div>
				</div>
				{
					torrentTitle
				}
				{
					torrentList
				}
			</Drawer>
		)
	}
}