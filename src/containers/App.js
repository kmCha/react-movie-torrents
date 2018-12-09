import React from 'react'
import { Layout } from 'antd'
import MovieList from '../components/MovieList';

const { Header, Footer, Sider, Content } = Layout

class App extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <Layout>
        <Header>Header</Header>
        <Layout>
          <Sider>Sider</Sider>
          <Content>
            <MovieList></MovieList>
          </Content>
        </Layout>
        <Footer>Footer</Footer>
      </Layout>
    )
  }
}

export default App