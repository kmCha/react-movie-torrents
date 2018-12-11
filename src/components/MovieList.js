import React from 'react'
import { Card, Pagination, Drawer } from 'antd'

import '../css/components/MovieList.less'

import { getMovieList, getTotalCount } from '../js/app/api'

const { Meta } = Card

export default class MovieList extends React.Component {
  constructor (props) {
    super(props)
    this.handlePageChange = this.handlePageChange.bind(this)
    this.state = {
      movieList: [],
      totalCount: 1,
      currPage: 1,
      detailVisible: false,
      currDownloadList: []
    }
  }

  componentDidMount() {
    this.getMovieCount({
      tag: this.props.currTag,
      search: this.props.currSearch
    })
    this.getMovies({
      page: this.state.currPage,
      tag: this.props.currTag,
      search: this.props.currSearch
    })
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      currPage: 1
    })
    this.getMovieCount({
      tag: nextProps.currTag,
      search: nextProps.currSearch
    })
    this.getMovies({
      page: 1,
      tag: nextProps.currTag,
      search: nextProps.currSearch
    })
  }

  getMovies({ page, tag, search }) {
    getMovieList({
      page,
      tag,
      search
    }).then(res => {
      var {
        code,
        body
      } = res.data

      if (code === 1) {
        this.setState({
          movieList: body
        })
      }
    })
  }

  getMovieCount({ tag, search }) {
    getTotalCount({
      tag,
      search
    }).then(res => {
      var {
        code,
        body
      } = res.data

      if (code === 1) {
        this.setState({
          totalCount: body
        })
      }
    })
  }

  openMovieDetail(list) {
    this.setState({
      currDownloadList: list,
      detailVisible: true
    })
  }

  handlePageChange(page) {
    this.setState({
      currPage: page
    })
    this.getMovies({
      page,
      tag: this.props.currTag,
      search: this.props.currSearch
    })
  }

  render () {
    var { movieList, totalCount, detailVisible, currDownloadList } = this.state
    return (
      <div className="movie-list-wrap">
        {movieList.map(item => {
          return (
          <Card className="movie-item-card"
                hoverable
                style={{width: 240}}
                key={item._id}
                cover={<img src={item.coverImg}
                onClick={this.openMovieDetail.bind(this, item.downloadList)} />}
          >
            < Meta
              title = {item.title}
              description = {`豆瓣评分：${item.doubanScore.toFixed(1) || '无'}`}
            />
            <p className="categories">{`分类：${item.tags ? item.tags.join(',') : '无'}`}</p>
          </Card>)
        })}
        <Pagination className="movie-pagination-wrap" current={this.state.currPage} total={totalCount} onChange={this.handlePageChange} />
        <Drawer
          title="影片资源"
          width="800"
          placement="right"
          onClose={() => this.setState({detailVisible: false})}
          visible={detailVisible}>
          {currDownloadList.map((downloadItem, index) => {
            return (
              <p className="movie-download-item" key={index}>
                <a href={downloadItem.href} target="_blank">{downloadItem.title}</a>
              </p>
            )
          })}
        </Drawer>
      </div>
    )
  }
}