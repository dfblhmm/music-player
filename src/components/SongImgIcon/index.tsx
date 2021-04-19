import { Image } from 'antd'
import updateSong from '@containers/UpdateSong'
import IconFont from '@components/IconFont'
import style from './index.module.scss'
interface IProps {
  flex: string
  src: string
  id: number
  updatePlayInfo: (id: number, type: number) => void
}
function SongImgIcon(props: IProps) {
  const { flex, src, id, updatePlayInfo } = props
  return (
    <div className={style['song-img']} style={{flex, minWidth: flex}} title="播放">
      <Image src={src} preview={false} />
      <IconFont type="icon-play-item" className={style.play} onClick={() => updatePlayInfo(id, 0)} />
    </div>
  )
}

export default updateSong(SongImgIcon)
