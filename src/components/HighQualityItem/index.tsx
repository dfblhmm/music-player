import { PureComponent } from 'react'
import { Image } from 'antd'
import IconFont from 'components/IconFont'
import style from './index.module.scss'
const src = 'http://p4.music.126.net/Eq48ldWWhHgbpq6RWFwAnA==/109951163022545586.jpg?param=x140y140'
interface HighQualityItemProps {
  margin?: string
  justify?: 'space-around' | 'center'
  showIcon?: boolean
  creator?: { nickname: string, identityIconUrl: string }
}
export default class HighQualityItem extends PureComponent<HighQualityItemProps> {
  showQualityIcon(): JSX.Element {
    const { showIcon } = this.props
    if (!showIcon) return (<></>)
    return (
      <div className={style['left-top-icon']}>
        <IconFont type="icon-quality" className={style.icon} />
      </div>
    )
  }
  showCreator(): JSX.Element {
    const { creator } = this.props
    if (!creator) return (<></>)
    return (<></>)
  }
  showHighQualityTag(): JSX.Element {
    const { margin } = this.props
    if (!margin) return (<></>)
    return (
      <div className={style.tip}><IconFont type="icon-quality" className={style.icon} />精品歌单</div>
    )
  }
  render() {
    const { margin, justify } = this.props
    return (
      <div className={style['high-quality-container']}>
        <div className={style['high-quality-img']}>
          <Image src={src} preview={false} />{this.showQualityIcon()}
        </div>
        <div className={style['high-quality-info']} style={{justifyContent: justify}} >
          {this.showHighQualityTag()}
          <div className={style['high-quality-name']} style={{margin}} >你的青春里有没有属于你的一首歌</div>
          {this.showCreator()}
          <div className={style['high-quality-desc']}>青春里的那首歌</div>
        </div>
      </div>
    )
  }
}