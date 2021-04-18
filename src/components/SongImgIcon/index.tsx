import { PureComponent } from 'react'
import { Image } from 'antd'
import updateSong from '@containers/UpdateSong'
import IconFont from '@components/IconFont'
import style from './index.module.scss'
interface IProps {
  flex: string
  src: string
  id: number
  updatePlayInfo: (id: number) => void
}
class SongImgIcon extends PureComponent<IProps> {
  // 播放音乐
  play = async() => {
    const { id } = this.props
    this.props.updatePlayInfo(id)
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

export default updateSong(SongImgIcon)
