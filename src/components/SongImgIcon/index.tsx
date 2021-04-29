import { Image } from 'antd'
import IconFont from '@components/IconFont'
import musicInfo from '@containers/MusicInfo'
import style from './index.module.scss'
interface IProps {
  flex: string
  src: string
  id: number
}
function SongImgIcon(props: IProps & PlaySongFunc) {
  const { flex, src, id, getMusic } = props
  return (
    <div className={style['song-img']} style={{flex, minWidth: flex}} title="播放">
      <Image src={src} preview={false} />
      <IconFont type="icon-play-item" className={style.play} onClick={() => getMusic(id)} />
    </div>
  )
}

export default musicInfo<IProps>(SongImgIcon)
