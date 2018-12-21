import React from 'react'
import {
  Drawer,
  Rate
} from 'antd'

import '../css/components/MovieDetail.less'

export default function MovieDetail (props) {
  var { item, onDetailClose, visible } = props

  var doubanLink = '暂无'
  if (item.doubanLink) {
    doubanLink = <a href={item.doubanLink} target="_blank">{item.doubanLink}</a>
  }

  var torrentTitle = null
  var torrentList = null
  if (item.downloadList && item.downloadList.length > 0) {
    torrentTitle = <div className="info-title">种子：</div>
    torrentList = item.downloadList.map((downloadItem, index) => {
      return (
        <p className="movie-download-item" key={index}>
          <a href={downloadItem.href} target="_blank">{downloadItem.title}</a>
        </p>
      )
    })
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