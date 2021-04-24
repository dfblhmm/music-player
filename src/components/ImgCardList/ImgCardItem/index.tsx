import { Fragment } from 'react'
import ImgCard from '../ImgCard'
import Artists from '@components/Artists'
import style from './index.module.scss'
export default function ImgCardItem(props: ImgCardItemType) {
  const showArtists = () => {
    const { artists } = props
    return (
      artists && <Artists artists={artists} color="#676767" hoverColor="#373737" />
    )
  }
  const { ellipsis, name, ...ImgCardProps } = props
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
