import { Fragment, PureComponent } from 'react'
import { Row, Col } from 'antd'
import { CaretRightOutlined } from '@ant-design/icons'
import SongImgIcon from '@components/SongImgIcon'
import Artists from '@components/Artists'
import style from './index.module.scss'
interface SongsProps {
  songItems: Array<SongItem>
}
export default class NewSong extends PureComponent<SongsProps> {
  // 获取歌名title提示
  songTitle(name: string, alias?: string): string {
    return alias ? name + `（${alias}）` : name 
  }
  render() {
    const { songItems } = this.props
    const { songTitle } = this
    return (
      <Fragment>
        <Row gutter={20} wrap style={{marginLeft: 0}}>
          {
            songItems.map((value: SongItem) => (
              <Col className={style.col} key={value.id}>
                <SongImgIcon flex="16%" src={value.picUrl} id={value.id} />
                <div className={style['song-info-container']}>
                  <div className={style['song-name']} title={songTitle(value.name,value.alias)}>
                    {value.name}{value.alias ? <span style={{color: '#929292'}}>（{value.alias}）</span> : <Fragment></Fragment>}
                  </div>
                  <div className={style['song-info']}>
                    {value.maxbr === 999000 ? <span className={style.isSQ}>SQ</span> : <></>}
                    {value.mvid ? <span className={style.mv} title="播放MV">
                      MV<CaretRightOutlined style={{width:'7px',fontSize:'10px',marginLeft:'-1px'}} />
                      </span> : <></>}
                    <Artists artists={value.artists} color="#929292" hoverColor="#5F5F5F" />
                  </div>
                </div>
              </Col>
            ))
          }
        </Row>
      </Fragment>
    )
  }
}
