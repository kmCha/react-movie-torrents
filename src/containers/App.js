import React from 'react'
import { Layout, Input } from 'antd'
import MovieList from '../components/MovieList'
import TagList from '../components/TagList'

const Search = Input.Search
const { Header, Footer, Sider, Content } = Layout

class App extends React.Component {
  constructor (props) {
    super(props)
    this.onTagSelected = this.onTagSelected.bind(this)
    this.onSearch = this.onSearch.bind(this)
    this.state = {
      currTag: '',
      currSearch: ''
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (nextState.currTag !== this.state.currTag || nextState.currSearch !== this.state.currSearch) {
      return true
    } else {
      return false
    }
  }

  onSearch(value) {
    this.setState({
      currSearch: value
    })
  }

  onTagSelected(tagName) {
    if (!this.state.currTag) {
      return this.setState({
        currTag: tagName
      })
    }
    var index = this.state.currTag.split(',').indexOf(tagName)
    if (index >= 0) {
      this.setState({
        currTag: this.state.currTag.split(',').slice(0, index).concat(this.state.currTag.split(',').slice(index+1)).join(',')
      })
    } else {
      this.setState({
        currTag: this.state.currTag.split(',').concat([tagName]).join(',')
      })
    }
  }

  render () {
    return (
      <Layout>
        <Header>
          <Search
            placeholder="输入电影标题"
            onSearch={this.onSearch}
            enterButton
          />
        </Header>
        <Layout>
          <Sider>
          </Sider>
          <Content>
            <TagList {...this.state} onTagSelected={this.onTagSelected}></TagList>
            <MovieList {...this.state}></MovieList>
          </Content>
        </Layout>
        <Footer>Footer</Footer>
      </Layout>
    )
  }
}

export default App