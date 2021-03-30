import { PureComponent, Fragment } from 'react'
import { Row, Col } from 'antd'
import ImgCard from './ImgCard'
import style from './index.module.scss'
interface ImgCardListProps extends ImgCardIconType{
  list: Array<ImgCardType>
  gutter?: number
  flex: string
  wrap?: boolean
}
export default class ImgCardList extends PureComponent<ImgCardListProps> {
  static defaultProps = {
    gutter: 20
  }
  render() {
    const { gutter, list, flex, wrap, ellipsis, showPlayIcon, showVideoIcon, maskTitle } = this.props
    const iconType: ImgCardIconType = {ellipsis, showPlayIcon, showVideoIcon, maskTitle}
    return (
      <Fragment>
        <Row gutter={gutter} wrap={wrap}>
          {
            list.map((value: ImgCardType) => 
              <Col key={value.id} className={style.col} flex={flex} style={{maxWidth: flex}} >
                <ImgCard {...iconType} {...value} />
              </Col>
            )
          }
        </Row>
      </Fragment>
    )
  }
}
