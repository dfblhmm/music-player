import { PureComponent, Fragment } from 'react'
import { Row, Col } from 'antd'
import ImgCardItem from './ImgCardItem'
import style from './index.module.scss'
interface ImgCardListProps extends ImgCardItemIconType{
  list: Array<ImgCardItemType>
  gutter?: number
  flex?: string
  wrap?: boolean,
  width?: number
}
export default class ImgCardList extends PureComponent<ImgCardListProps> {
  static defaultProps = {
    gutter: 20
  }
  render() {
    const { gutter, list, flex, wrap, ellipsis, showPlayIcon, 
      showVideoIcon, maskTitle, width } = this.props
    const iconType: ImgCardItemIconType = {ellipsis, showPlayIcon, showVideoIcon, maskTitle}
    return (
      <Fragment>
        <Row gutter={gutter} wrap={wrap}>
          {
            list.map((value: ImgCardItemType) => 
              <Col key={value.nid ? value.nid: value.id} className={style.col} 
                flex={flex} style={{maxWidth: flex, width}}>
                <ImgCardItem {...iconType} {...value} />
              </Col>
            )
          }
        </Row>
      </Fragment>
    )
  }
}
