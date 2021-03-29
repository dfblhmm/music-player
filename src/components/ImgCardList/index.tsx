import { PureComponent, Fragment } from 'react'
import { Row, Col } from 'antd'
import ImgCard from 'components/ImgCard'
import style from './index.module.scss'
interface ImgCardListProps extends ImgCardIconType{
  list: Array<ImgCardType>
  gutter?: number
  flex: string | number
  wrap?: boolean
}
export default class ImgCardList extends PureComponent<ImgCardListProps> {
  static defaultProps = {
    gutter: 20,
    wrap: false
  }
  render() {
    const { gutter, list, flex, wrap, ellipsis, showPlayIcon, showVideoIcon, maskTitle } = this.props
    const iconType: ImgCardIconType = {ellipsis, showPlayIcon, showVideoIcon, maskTitle}
    return (
      <Fragment>
        <Row gutter={gutter} wrap={wrap}>
          {
            list.map((value: ImgCardType) => 
              <Col key={value.id} className={style.col} flex={flex}>
                <ImgCard {...iconType} {...value} />
              </Col>
            )
          }
        </Row>
      </Fragment>
    )
  }
}
