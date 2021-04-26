import { Row, Col } from 'antd'
import ImgCardItem from './ImgCardItem'
import style from './index.module.scss'
interface IProps extends ImgCardItemIconType{
  list: Array<ImgCardItemType>
  gutter?: number
  flex?: string
  wrap?: boolean,
  width?: number
}
// 默认值
ImgCardList.defaultProps = {
  gutter: 20
}
export default function ImgCardList(props: IProps) {
  const { gutter, list, flex, wrap, width, ...iconType } = props
  return (
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
  )
}
