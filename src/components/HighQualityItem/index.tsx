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
  render() {
    return (
      <div className={style['high-quality-container']}>
        <div className={style['high-quality-img']}>
          <Image src={src} preview={false} />
          <div className={style['left-top-icon']}>
            <IconFont type="icon-quality" className={style.icon} />
          </div>
        </div>
        <div className={style['high-quality-info']}>
          <div className={style['high-quality-name']}>你的青春里有没有属于你的一首歌</div>
          <div className={style['high-quality-desc']}>青春里的那首歌</div>
        </div>
      </div>
    )
  }
}