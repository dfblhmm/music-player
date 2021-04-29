import { Row, Col } from 'antd'
import { connect } from 'react-redux'
import AudioPlayer from './AudioPlayer'
import AlbumPic from './AlbumPic'
interface IProps {
  onPlayInfo: onPlayInfoType
  playList: PlayListType[]
}
function FooterContainer(props: IProps) {
  const { onPlayInfo } = props
  const { duration, isVip, cs, chargeInfoList, maxbr, ...albumInfo } = onPlayInfo
  return (
    <Row style={{height: '100%'}}>
      <Col span={8}><AlbumPic {...albumInfo} isVip={isVip} /></Col>
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

