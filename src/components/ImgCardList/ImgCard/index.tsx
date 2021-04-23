import { Fragment, PureComponent } from 'react'
import { Image } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import IconFont from '@components/IconFont'
import formatTime from '@/utils/formatTime'
import style from './index.module.scss'
interface ImgCardProps {
  picUrl: string
  sPicUrl?: string
  playCount?: number
  duration?: number // 资源的时长
  rcmdtext?: string // 电台类型
  // 歌单作者头像信息
  creatorInfo?: {userId: number, nickname: string, avatarDetail?: {identityIconUrl: string}}
  showPlayIcon?: boolean // 是否显示播放图标
  showVideoIcon?: boolean // 是否显示图片左上角的播放视频图标
  maskTitle?: string // 是否显示遮罩层提示
  showQualityIcon?: boolean // 是否显示精品图标
}
export default class ImgCard extends PureComponent<ImgCardProps> {
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
  // 是否显示时长
  showDuration(): JSX.Element {
    const { duration } = this.props
    if (!duration) return (<></>)
    const time = formatTime(duration / 1000)
    return (
      <span className={style['item-duration']}>{time}</span>
    )
  }
  // 是否显示用户信息
  showUserInfo(): JSX.Element {
    const { creatorInfo } = this.props
    if (!creatorInfo) return (<></>)
    const { nickname, userId, avatarDetail } = creatorInfo
    return (
      <div className={style['user-info-container']} onClick={()=>this.goUserPage(userId)}>
        <div className={style['user-info']} title={nickname}>
          <UserOutlined style={{marginRight:'4px',fontSize:'14px'}} />{nickname}
          {avatarDetail && <Image src={avatarDetail.identityIconUrl} preview={false}
            className={style['identity-img']} />}
        </div>
      </div>
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
  // 是否显示精品Icon
  showQualityIcon(): JSX.Element {
    const { showQualityIcon } = this.props
    if (!showQualityIcon) return (<></>)
    return (
      <div className={style['left-top-icon']}>
        <IconFont type="icon-quality" className={style.icon} />
      </div>
    )
  }
  // 点击了用户详情
  goUserPage = (userId: number) => {
    console.log(userId)
  }
  render() {
    const { picUrl } = this.props
    return (
      <Fragment>
        <div className={style['item-img']} >
          <Image src={picUrl} preview={false} placeholder />
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
          {/* 是否显示精品图标 */}
          {this.showQualityIcon()}
        </div>
      </Fragment>
    )
  }
}
