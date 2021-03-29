import { Fragment, PureComponent } from 'react'
import { Image } from 'antd'
import IconFont from 'components/IconFont'
import style from './index.module.scss'
export default class ImgCard extends PureComponent<ImgCardType> {
  static defaultProps = {
    showPlayIcon: false
  }
  // 是否显示播放次数
  showPlayCount(): JSX.Element {
    let { playCount }: { playCount?: number | string } = this.props
    if (!playCount) return (<Fragment></Fragment>)
    // 取出播放次数，并进行格式化
    playCount = playCount > 100000 ? Math.floor(playCount / 10000) + '万' : playCount
    return (
      <div className={style['play-count']}>
        <IconFont type="icon-play-count" className={style.count} />
        <span>{playCount}</span>
      </div>
    )
  }
  // 是否显示播放图标
  showPlayIcon(): JSX.Element {
    const { showPlayIcon } = this.props
    if(!showPlayIcon) return (<Fragment></Fragment>)
    return (
      <IconFont type="icon-play-item" className={style.play} title="播放"/>
    )
  }
  render() {
    const { name, picUrl } = this.props
    return (
      <Fragment>
        <div className={style['item-img']}>
          <Image src={picUrl} preview={false} />
          {/* 是否显示播放图标 */}
          {this.showPlayIcon()}
          {/* 是否展示播放次数 */}
          {this.showPlayCount()}
        </div>
        <div className={style.name}>{name}</div>
      </Fragment>
    )
  }
}
