import { Fragment, PureComponent } from 'react'
import { Image } from 'antd'
import IconFont from 'components/IconFont'
import style from './index.module.scss'
export default class SongList extends PureComponent<ImgCardType> {
  hasPlayCount(showPlayCount: boolean): JSX.Element {
    if (!showPlayCount) return (<></>)
    // 取出播放次数，并进行格式化
    let { playCount }: { playCount?: number | string } = this.props
    playCount = playCount! > 100000 ? Math.floor(playCount! / 10000) + '万' : playCount
    return (
      <div className={style['play-count']}>
        <IconFont type="icon-play-count" className={style.count} />
        <span>{playCount}</span>
      </div>
    )
  }
  render() {
    const { name, picUrl, showPlayCount } = this.props
    return (
      <Fragment>
        <div className={style['item-img']}>
          <Image src={picUrl} preview={false} />
          <IconFont type="icon-play-item" className={style.play} title="播放"/>
          {/* <div className={style['play-count']}>
            <IconFont type="icon-play-count" className={style.count} />
            <span>{this.handleCount(playCount)}</span>
          </div> */}
          {/* 是否展示播放次数 */}
          {this.hasPlayCount(showPlayCount)}
        </div>
        <div className={style.name}>{name}</div>
      </Fragment>
    )
  }
}
