import { PureComponent } from 'react'
import { Image } from 'antd'
import { connect } from 'react-redux'
import { updatePlayInfo } from '@redux/actions/onPlayInfo'
import http from '@/utils/http'
import IconFont from '@components/IconFont'
import style from './index.module.scss'
interface IProps {
  flex: string
  src: string
  id: number
  updatePlayInfo: (onPlayInfo: onPlayInfoType) => void
}
class SongImgIcon extends PureComponent<IProps> {
  // 播放音乐
  play = async() => {
    const { id } = this.props
    const res = await http('/song/url', { id })
    const detail = await http('/song/detail', { ids: id })
    const onPlayInfo: onPlayInfoType = {
      id, src: res.data[0].url, duration: Math.floor(detail.songs[0].dt / 1000)
    }
    this.props.updatePlayInfo(onPlayInfo)
  }
  render() {
    const { flex, src } = this.props
    return (
      <div className={style['song-img']} style={{flex, minWidth: flex}} title="播放">
        <Image src={src} preview={false} />
        <IconFont type="icon-play-item" className={style.play} onClick={this.play} />
      </div>
    )
  }
}

export default connect(null, { updatePlayInfo })(SongImgIcon)
