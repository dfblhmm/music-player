import { PureComponent, Fragment } from 'react'
import { Row, Col } from 'antd'
import ImgCard from './ImgCard'
import style from './index.module.scss'
interface ImgCardListProps extends ImgCardIconType{
  list: Array<ImgCardType>
  gutter?: number
  flex: string
  wrap?: boolean,
  width?: number
  height?: number
}
export default class ImgCardList extends PureComponent<ImgCardListProps> {
  static defaultProps = {
    gutter: 20
  }
  render() {
    const { gutter, list, flex, wrap, ellipsis, showPlayIcon, 
      showVideoIcon, maskTitle, width, height } = this.props
    const iconType: ImgCardIconType = {ellipsis, showPlayIcon, showVideoIcon, maskTitle}
    return (
      <Fragment>
        <Row gutter={gutter} wrap={wrap}>
          {
            list.map((value: ImgCardType) => 
              <Col key={value.nid ? value.nid: value.id} className={style.col} 
                flex={flex} style={{maxWidth: flex}}>
                <ImgCard {...iconType} {...value} width={width+'px'} height={height+'px'} />
              </Col>
            )
          }
        </Row>
      </Fragment>
    )
  }
}
