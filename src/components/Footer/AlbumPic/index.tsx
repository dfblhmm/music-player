import { Image } from 'antd'
import Artists from '@components/Artists'
import style from './index.module.scss'
interface IProps extends AlbumType{
}
export default function AlbumPic(props: IProps) {
  const { alias, artists, picUrl, name } = props
  return (
    <div className={style.album}>
      <div className={style.pic}><Image src={picUrl} preview={false} /></div>
      <div className={style.info}>
        <div className={style['song-name']} title={alias ? `${name}（${alias}）`: name}>
          <span className={style.name}>{name}</span>
          {
            alias ? <span className={style.alias}>{`（${alias}）`}</span> : <></>
          }
        </div>
        <Artists artists={artists} color="#333" fontSize={13} />
      </div>
    </div>
  )
}