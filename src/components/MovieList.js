import React from 'react'
import { Card, Pagination, Drawer, Spin } from 'antd'

import '../css/components/MovieList.less'

import { getMovieList, getTotalCount } from '../js/app/api'

import MovieDetail from './MovieDetail'

const { Meta } = Card

export default class MovieList extends React.Component {
  constructor (props) {
    super(props)
    this.handlePageChange = this.handlePageChange.bind(this)
    this.onDetailClose = this.onDetailClose.bind(this)
    this.state = {
      movieList: [],
      totalCount: 1,
      currPage: 1,
      detailVisible: false,
      currDetailItem: [],
      loading: true
    }
  }

  componentDidMount() {
    Promise.all([
      this.getMovieCount({
        tag: this.props.currTag,
        search: this.props.currSearch
      }),
      this.getMovies({
        page: this.state.currPage,
        tag: this.props.currTag,
        search: this.props.currSearch
      })
    ]).then(() => {
      this.setState({
        loading: false
      })
    })
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      currPage: 1,
      loading: true
    })
    Promise.all([
      this.getMovieCount({
        tag: nextProps.currTag,
        search: nextProps.currSearch
      }),
      this.getMovies({
        page: 1,
        tag: nextProps.currTag,
        search: nextProps.currSearch
      })
    ]).then(() => {
      this.setState({
        loading: false
      })
    })
  }

  onDetailClose () {
    this.setState({
      detailVisible: false
    })
  }

  getMovies({ page, tag, search }) {
    return getMovieList({
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
    return getTotalCount({
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

  openMovieDetail(item) {
    this.setState({
      currDetailItem: item,
      detailVisible: true
    })
  }

  handlePageChange(page) {
    this.setState({
      currPage: page,
      loading: true
    })
    this.getMovies({
      page,
      tag: this.props.currTag,
      search: this.props.currSearch
    }).then(() => {
      this.setState({
        loading: false
      })
    })
  }

  render () {
    var { movieList, totalCount, detailVisible, currDetailItem, loading } = this.state
    var loadingWrap = null
    var movieDetail = null
    if (loading) {
      loadingWrap = <div className="loading-wrap">
        <Spin />
      </div>
    }
    if (detailVisible) {
      movieDetail = <MovieDetail item={currDetailItem} visible={detailVisible} onDetailClose={this.onDetailClose} />
    }
    return (
      <div className="movie-list-wrap">
        {loadingWrap}
        {movieList.map(item => {
          return (
          <Card className="movie-item-card"
                hoverable
                style={{width: 240}}
                key={item._id}
                cover={<img src={item.coverImg}
                onClick={this.openMovieDetail.bind(this, item)} />}
          >
            < Meta
              onClick={this.openMovieDetail.bind(this, item.downloadList)}
              title = {item.title}
              description = {`豆瓣评分：${item.doubanScore.toFixed(1) || '无'}`}
            />
            <p className="categories">{`分类：${item.tags ? item.tags.join(',') : '无'}`}</p>
          </Card>)
        })}
        <Pagination className="movie-pagination-wrap" current={this.state.currPage} total={totalCount} onChange={this.handlePageChange} />
        {movieDetail}
      </div>
    )
  }
}