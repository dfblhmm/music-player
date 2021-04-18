import { PureComponent, Fragment } from 'react'
import { Row, Col } from 'antd'
import { connect } from 'react-redux'
import AudioPlayer from './AudioPlayer'
interface IProps {
  onPlayInfo: onPlayInfoType
}
class FooterContainer extends PureComponent<IProps> {
  render() {
    const { onPlayInfo } = this.props
    return (
      <Fragment>
        <Row style={{height: '100%'}}>
          <Col span={8}>播放图片</Col>
          <Col span={8}><AudioPlayer onPlayInfo={onPlayInfo} /></Col>
          <Col span={8}>歌单</Col>
        </Row>
      </Fragment>
    )
  }
}

const mapStateToProps = (state: GlobalState) => {
  const { onPlayInfo } = state
  return { onPlayInfo }
}
export default connect(mapStateToProps)(FooterContainer)

