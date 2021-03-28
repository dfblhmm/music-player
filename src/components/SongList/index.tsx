import { Fragment, PureComponent } from 'react'
import { Image } from 'antd'
import IconFont from 'components/IconFont'
import style from './index.module.scss'
interface RecommendList {
  id: number
  name: string
  playCount: number
  picUrl: string
}
export default class SongList extends PureComponent<RecommendList> {
  handleCount = (count: number): number | string => {
    return count > 100000 ? Math.floor(count / 10000) + '万' : count
  }
  render() {
    const { name, picUrl, playCount } = this.props
    return (
      <Fragment>
      {/* // <div className={style.container}> */}
        <div className={style['songlist-img']}>
          <Image src={picUrl} preview={false} />
          <IconFont type="icon-play-song-list" className={style.play} title="播放"/>
          <div className={style['play-count']}>
            <IconFont type="icon-play-count" className={style.count} />
            <span>{this.handleCount(playCount)}</span>
          </div>
        </div>
        <div style={{fontSize: '14px', lineHeight: '1.5em'}}>{name}</div>
      {/* // </div> */}
      </Fragment>
    )
  }
}
