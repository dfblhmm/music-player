import { PureComponent, Fragment } from 'react'
import { Row, Col } from 'antd'
import { connect } from 'react-redux'
import AudioPlayer from './AudioPlayer'
import AlbumPic from './AlbumPic'
interface IProps {
  onPlayInfo: onPlayInfoType
  playList: PlayListType[]
}
class FooterContainer extends PureComponent<IProps> {
  render() {
    const { onPlayInfo, playList } = this.props
    const { id, src, duration, alias, artists, name, picUrl } = onPlayInfo
    const songInfo = { id, src, duration }
    const albumInfo = { alias, artists, name, picUrl }
    return (
      <Fragment>
        <Row style={{height: '100%'}}>
          <Col span={8}>
            <AlbumPic {...albumInfo} />
          </Col>
          <Col span={8}>
            <AudioPlayer {...songInfo} playList={playList} />
          </Col>
          <Col span={8}>歌单</Col>
        </Row>
      </Fragment>
    )
  }
}

const mapStateToProps = (state: GlobalState) => {
  const { onPlayInfo, playList } = state
  return { onPlayInfo, playList }
}
export default connect(mapStateToProps)(FooterContainer)

