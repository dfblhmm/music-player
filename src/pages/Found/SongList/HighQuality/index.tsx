import { PureComponent } from 'react'
import { Image } from 'antd'
import IconFont from 'components/IconFont'
import style from './index.module.scss'
const src = ''
export default class HighQuality extends PureComponent {
  render() {
    return (
      <div className={style['high-quality-container']}>
        <div className={style['high-quality-img']}><Image src={src} /></div>
        <div className={style['high-quality-info']}>
          <span className={style.tip}><IconFont type="icon-quality"/>精品歌单</span>
          <span className={style['high-quality-name']}>你的青春里有没有属于你的一首歌</span>
          <span className={style['high-quality-desc']}>青春里的那首歌</span>
        </div>
      </div>
    )
  }
}