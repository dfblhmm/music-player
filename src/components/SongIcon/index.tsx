import { PureComponent } from 'react'
import { Image } from 'antd'
import IconFont from 'components/IconFont'
import style from './index.module.scss'
const src = 'http://p1.music.126.net/W5iJ7pbQqn5OpBhtV_6OcA==/109951165827579431.jpg?param=x55y55'
export default class SongIcon extends PureComponent {
  render() {
    return (
      <div className={style['song-img']} style={{width: '15%'}} title="播放">
        <Image src={src} preview={false} />
        <IconFont type="icon-play-item" className={style.play} />
      </div>
    )
  }
}
