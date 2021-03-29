import { Fragment, PureComponent } from 'react'
import { Row, Col } from 'antd'
import SongIcon from 'components/SongIcon'
import style from './index.module.scss'
export default class NewSong extends PureComponent {
  render() {
    return (
      <Fragment>
        <Row gutter={20} wrap style={{marginLeft: 0}}>
          <Col className={style.col} flex="33.3%">
            <SongIcon />
            <div className={style['song-info-container']}>
              <div className={style['song-name']}>我能给的幸福</div>
              <div className={style['song-info']}>
                <span className={style.isSQ}>SQ</span>
                <span className={style.mv} title="播放MV">MV</span>
              </div>
            </div>
          </Col>
        </Row>
      </Fragment>
    )
  }
}
