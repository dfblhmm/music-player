import { Fragment, PureComponent } from 'react'
import { Image } from 'antd'
import IconFont from 'components/IconFont'
import Artists from 'components/Artists'
import style from './index.module.scss'
export default class ImgCard extends PureComponent<ImgCardType> {
  // 是否显示播放次数
  showPlayCount(): JSX.Element {
    let { playCount }: { playCount?: number | string } = this.props
    if (!playCount) return (<></>)
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
    if(!showPlayIcon) return (<></>)
    return (
      <IconFont type="icon-play-item" className={style.play} title="播放"/>
    )
  }
  // 是否显示视频播放图标
  showVideoIcon(): JSX.Element {
    const { showVideoIcon } = this.props
    if(!showVideoIcon) return (<></>)
    return (
      <IconFont type="icon-play-item" className={style['play-video']} />
    )
  }
  // 是否显示遮罩层
  showMask(): JSX.Element {
    const { maskTitle } = this.props
    if(!maskTitle) return (<></>)
    return (
      <div className={style.mask}>{maskTitle}</div>
    )
  }
  // 是否显示歌手
  showArtists(): JSX.Element {
    const { artists } = this.props
    if (!artists) return (<></>)
    return (<Artists artists={artists} color="#676767" hoverColor="#373737" />)
  }
  // 是否显示时长
  showDuration(): JSX.Element {
    const { duration } = this.props
    if (!duration) return (<></>)
    let minute: number | string = Math.floor(duration / 60000)
    let second: number | string = Math.floor(duration / 1000 % 60)
    minute = minute > 10 ? minute : '0' + minute
    second = second > 10 ? second : '0' + second
    return (
      <span className={style['item-duration']}>{`${minute}:${second}`}</span>
    )
  }
  // 是否显示电台描述
  showRadio(): JSX.Element {
    const { rcmdtext } = this.props 
    if (!rcmdtext) return (<></>)
    return (
      <div className={style['radio-name']} title={rcmdtext}>{rcmdtext}</div>
    )
  }
  // 是否显示用户信息
  showUserInfo(): JSX.Element {
    const { creatorInfo } = this.props
    if (!creatorInfo) return (<></>)
    const { nickname, userId, avatarDetail } = creatorInfo
    return (
      <div className={style['user-info']}>
        <IconFont type="icon-user" style={{marginRight:'5px'}} />{nickname}

      </div>
    )
  }
  render() {
    const { name, picUrl, ellipsis, width, height } = this.props
    return (
      <Fragment>
        <div className={style['item-img']}>
          <Image src={picUrl} preview={false} placeholder style={{width,height}} />
          {/* 是否显示播放图标 */}
          {this.showPlayIcon()}
          {/* 是否展示播放次数 */}
          {this.showPlayCount()}
          {/* 是否显示视频图标 */}
          {this.showVideoIcon()}
          {/* 是否显示遮罩层 */}
          {this.showMask()}
          {/* 是否显示时长 */}
          {this.showDuration()}
          {/* 是否显示电台 */}
          { this.showRadio() }
          {/* 是否显示用户信息 */}
          {this.showUserInfo()}
        </div>
        {/* 项目名字 */}
        <div className={ellipsis?style['item-name-ellipsis']:style['item-name']}>{name}</div>
        {/* 歌手 */}
        {this.showArtists()}
      </Fragment>
    )
  }
}
