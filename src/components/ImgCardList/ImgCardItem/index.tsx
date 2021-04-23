import { Fragment } from 'react'
import ImgCard from '../ImgCard'
import Artists from '@components/Artists'
import style from './index.module.scss'
<<<<<<< HEAD
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
      showPlayIcon, showVideoIcon, maskTitle, id } = this.props
    const ImgCardProps = { picUrl, playCount, duration, rcmdtext, creatorInfo,
      showPlayIcon, showVideoIcon, maskTitle, id: id as number }
=======
export default function ImgCardItem(props: ImgCardItemType) {
  const showArtists = () => {
    const { artists } = props
>>>>>>> test
    return (
      artists && <Artists artists={artists} color="#676767" hoverColor="#373737" />
    )
  }
  const { picUrl, playCount, duration, rcmdtext, creatorInfo,
    showPlayIcon, showVideoIcon, maskTitle, ellipsis, name } = props
  const ImgCardProps = { picUrl, playCount, duration, rcmdtext, creatorInfo,
    showPlayIcon, showVideoIcon, maskTitle }
  return (
    <Fragment>
      <ImgCard {...ImgCardProps} />
      {/* 项目名字 */}
      <div className={ellipsis?style['item-name-ellipsis']:style['item-name']}>{name}</div>
      {/* 歌手 */}
      {showArtists()}
    </Fragment>
  )
}
