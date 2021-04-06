import { Fragment, PureComponent } from 'react'
import ImgCard from '../ImgCard'
import Artists from '@components/Artists'
import style from './index.module.scss'
export default class ImgCardItem extends PureComponent<ImgCardItemType> {
  // 是否显示歌手
  showArtists(): JSX.Element {
    const { artists } = this.props
    if (!artists) return (<></>)
    return (<Artists artists={artists} color="#676767" hoverColor="#373737" />)
  }
  render() {
    const { ellipsis, name } = this.props
    const { picUrl, playCount, duration, rcmdtext, creatorInfo,
      showPlayIcon, showVideoIcon, maskTitle } = this.props
    const ImgCardProps = { picUrl, playCount, duration, rcmdtext, creatorInfo,
      showPlayIcon, showVideoIcon, maskTitle }
    return (
      <Fragment>
        <ImgCard {...ImgCardProps} />
        {/* 项目名字 */}
        <div className={ellipsis?style['item-name-ellipsis']:style['item-name']}>{name}</div>
        {/* 歌手 */}
        {this.showArtists()}
      </Fragment>
    )
  }
}
