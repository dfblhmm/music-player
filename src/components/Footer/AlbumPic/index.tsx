import { Image } from 'antd'
import Artists from '@components/Artists'
import style from './index.module.scss'
export default function AlbumPic(props: AlbumType) {
  const { alias, artists, picUrl, name, freeTrialInfo, isVip } = props
  return (
    <div className={style.album}>
      <div className={style.pic}><Image src={picUrl} preview={false} /></div>
      <div className={style.info}>
        <div className={style['song-name-charge']} title={alias ? `${name}（${alias}）`: name}>
          <div className={style['song-name']}>
            <span className={style.name}>{name}</span>
            {alias && <span className={style.alias}>{`（${alias}）`}</span>}
          </div>
          { isVip && <span className={style.vip}>VIP</span> }
          { freeTrialInfo && <span className={style.vip}>试听</span> }
        </div>
        <Artists artists={artists} color="#333" fontSize={13} />
      </div>
    </div>
  )
}