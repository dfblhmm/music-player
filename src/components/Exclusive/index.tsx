import { PureComponent, Fragment } from 'react'
import style from './index.module.scss'
export default class Exclusive extends PureComponent {
  render() {
    return (
      <Fragment>
        <div className={style['songlist-img']}>
          <Image src={picUrl} preview={false} />
          <IconFont type="icon-play-song-list" className={style.play} title="播放"/>
          <div className={style['play-count']}>
            <IconFont type="icon-play-count" className={style.count} />
            <span>{this.handleCount(playCount)}</span>
          </div>
        </div>
        <div className={style.name}>{name}</div>
      </Fragment>
    )
  }
}