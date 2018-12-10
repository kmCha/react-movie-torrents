import React from 'react'
import { Layout } from 'antd'
import MovieList from '../components/MovieList'
import TagList from '../components/TagList'

const { Header, Footer, Sider, Content } = Layout

class App extends React.Component {
  constructor (props) {
    super(props)
    this.onTagSelected = this.onTagSelected.bind(this)
    this.state = {
      currTag: ''
    }
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
        <Header>Header</Header>
        <Layout>
          <Sider>
          </Sider>
          <Content>
            <TagList currTag={this.state.currTag} onTagSelected={this.onTagSelected}></TagList>
            <MovieList currTag={this.state.currTag}></MovieList>
          </Content>
        </Layout>
        <Footer>Footer</Footer>
      </Layout>
    )
  }
}

export default App