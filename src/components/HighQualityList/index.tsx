import { PureComponent } from 'react'
import { Image, Row, Col } from 'antd'
import IconFont from 'components/IconFont'
import style from './index.module.scss'
interface HighQualityListProps {
  list: Array<HighQualitySongList>
}
export default class HighQualityList extends PureComponent<HighQualityListProps> {
  render() {
    const { list } = this.props
    return (
      <Row gutter={20} wrap style={{marginTop:'20px'}}>
        {
          list.map(value => (
            <Col key={value.id} className={style.item}>
              <div className={style['quality-img']}>
                <Image src={value.coverImgUrl} preview={false} />
                <div className={style['left-top-icon']}>
                  <IconFont type="icon-quality" className={style.icon} />
                </div>
              </div>
              <div className={style['quality-info']}>
                <div className={style['quality-name']}>{value.name}</div>
                <div className={style['quality-creator']}></div>
                <div className={style['quality-desc']}>{value.tag}{value.copywriter}</div>
              </div>
            </Col>
          ))
        }
      </Row>
    )
  }
}