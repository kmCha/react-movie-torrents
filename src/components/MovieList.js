import React from 'react'
import { Card, Pagination } from 'antd'

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
      currPage: 1
    }
  }

  handlePageChange(page) {
    getMovieList({
      page: page
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

  componentDidMount() {
    getTotalCount().then(res => {
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
    getMovieList({
      page: this.state.currPage
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

  render () {
    var { movieList, totalCount } = this.state
    return (
      <div className="movie-list-wrap">
        {movieList.map(item => {
          return (
          <Card className="movie-item-card"
                hoverable
                style={{width: 240}}
                key={item._id}
                cover={<img src={item.coverImg} />}
          >
            < Meta
              title = {item.title}
              description = {`豆瓣评分：${item.doubanScore.toFixed(1) || '无'}`}
            />
          </Card>)
        })}
        <Pagination className="movie-pagination-wrap" total={totalCount} onChange={this.handlePageChange} />
      </div>
    )
  }
}