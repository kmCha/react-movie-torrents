import React from 'react'
import { Tag } from 'antd'
import { getTagList } from '../js/app/api'

import '../css/components/TagList.less'

class TagList extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      tagList: []
    }
  }

  componentDidMount () {
    getTagList().then(res => {
      var {
        code,
        body
      } = res.data

      if (code === 1) {
        this.setState({
          tagList: body
        })
      }
    })
  }

  render () {
    var { tagList } = this.state
    return (
      <div className="tag-list-wrap">
        {
          tagList.map(tag => {
            return (
              <Tag
                className={{active: this.props.currTag.split(',').indexOf(tag.name) >= 0}}
                key={tag.name}
                onClick={() => {this.props.onTagSelected(tag.name)}}
              >{tag.name}</Tag>
            )
          })
        }
      </div>
    )
  }
}

export default TagList