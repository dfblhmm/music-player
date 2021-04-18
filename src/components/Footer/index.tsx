import { PureComponent, Fragment } from 'react'
import { Row, Col } from 'antd'
import AudioPlayer from './AudioPlayer'
export default class FooterContainer extends PureComponent {
  render() {
    return (
      <Fragment>
        <Row style={{height: '100%'}}>
          <Col span={8}>播放图片</Col>
          <Col span={8}><AudioPlayer /></Col>
          <Col span={8}>歌单</Col>
        </Row>
      </Fragment>
    )
  }
}

