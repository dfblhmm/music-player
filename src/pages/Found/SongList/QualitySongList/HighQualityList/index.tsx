import { PureComponent } from 'react'
import { Row, Col, Image } from 'antd'
import ImgCard from '@components/ImgCardList/ImgCard'
import style from './index.module.scss'
interface HighQualityListProps {
  list: Array<HighQualitySongList>
}
export default class HighQualityList extends PureComponent<HighQualityListProps> {
  render() {
    const { list } = this.props
    return (
      <Row gutter={20} wrap>
        {
          list.map(value => (
            <Col key={value.id} className={style.item}>
              <div className={style['quality-img']}>
                <ImgCard picUrl={value.coverImgUrl} showPlayIcon 
                  playCount={value.playCount} showQualityIcon />
              </div>
              <div className={style['quality-info']}>
                <div className={style['quality-name']} title={value.name}>{value.name}</div>
                <div className={style['quality-creator']}>
                  <span>by {value.creator.nickname}</span>
                  <Image src={value.creator.avatarDetail?.identityIconUrl} preview={false} />
                </div>
                <div className={style['quality-desc']} title={value.copywriter}>
                  <span className={style.tag}>{value.tag}</span>{value.copywriter}
                </div>
              </div>
            </Col>
          ))
        }
      </Row>
    )
  }
}