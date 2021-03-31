import { PureComponent } from 'react'
import HighQuality from 'components/HighQualityItem'
import Category from 'components/Category'
import style from './index.module.scss'
export default class SongListHome extends PureComponent {
  render() {
    return (
      <div style={{padding: '0 90px'}}>
        <div className={style['top-high-quality']}><HighQuality margin="20px 0 12px" /></div>
        <Category btnTitle="全部歌单" />
      </div>
    )
  }
}
