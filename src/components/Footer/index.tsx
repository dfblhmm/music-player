import { Row, Col } from 'antd'
import { connect } from 'react-redux'
import AudioPlayer from './AudioPlayer'
import AlbumPic from './AlbumPic'
interface IProps {
  onPlayInfo: onPlayInfoType
  playList: PlayListType[]
}
function FooterContainer(props: IProps) {
  const { onPlayInfo, playList } = props
  const 
    { alias, artists, name, duration,
      picUrl, freeTrialInfo, isVip, cs } = onPlayInfo
  const albumInfo = { alias, artists, name, picUrl, freeTrialInfo, isVip }
  return (
    <Row style={{height: '100%'}}>
      <Col span={8}><AlbumPic {...albumInfo} /></Col>
      <Col span={8}><AudioPlayer duration={duration} isVip={isVip} cs={cs} /></Col>
      <Col span={8}>歌单</Col>
    </Row>
  )
}

const mapStateToProps = (state: GlobalState) => {
  const { onPlayInfo, playList } = state
  return { onPlayInfo, playList }
}
export default connect(mapStateToProps)(FooterContainer)

