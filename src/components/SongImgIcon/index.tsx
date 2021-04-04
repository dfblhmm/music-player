import { PureComponent } from 'react'
import { Image } from 'antd'
import IconFont from '@/components/IconFont'
import style from './index.module.scss'
interface SongImgIconProps {
  flex: string
  src: string
}
export default class SongImgIcon extends PureComponent<SongImgIconProps> {
  render() {
    const { flex, src } = this.props
    return (
      <div className={style['song-img']} style={{flex, minWidth: flex}} title="播放">
        <Image src={src} preview={false} />
        <IconFont type="icon-play-item" className={style.play} />
      </div>
    )
  }
}
