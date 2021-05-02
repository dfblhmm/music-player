import { PureComponent } from 'react'
import { BackTop, message } from 'antd'
import { nanoid } from 'nanoid'
import InfiniteScroll from 'react-infinite-scroller'
import http from '@utils/http'
import target from '@components/Main/context'
import throttle, { TypeOfThrottle } from '@utils/throttle'
import NavTitle from '@components/NavTitle'
import ImgCardList from '@components/ImgCardList'
interface IState {
  more: boolean // 是否还有更多数据
  offset: number // 分页参数
  list: Array<ImgCardItemType>
}
export default class Exclusive extends PureComponent {
  static contextType = target
  timer: number | undefined
  throttle: TypeOfThrottle
  state: IState = {
    more: false,
    offset: 0,
    list: []
  }
  constructor(props: any) {
    super(props)
    this.throttle = throttle
  }
  async componentDidMount() {
    const res = await http('/personalized/privatecontent/list', { limit: 30 })
    this.getExclusiveList(res.result, res.more, res.offset)
  }
  // 获取独家放送列表
  getExclusiveList(res: Array<ImgCardItemType>, more: boolean, offset: number) {
    const { list } = this.state
    res.forEach(value => {
      const { id, sPicUrl, name } = value
      // 列表渲染出现重复id，使用nanoid进行替换
      const nid = list.findIndex(value => value.id === id) !== -1 ? nanoid() : undefined
      list.push({ id, picUrl: sPicUrl!, name, nid })
    })
    this.setState({ more, list: [...list], offset })
  }
  // 加载更多数据
  loadMore = async () => {
    const { offset, more } = this.state
    if (!more) return message.warning('没有更多了~~')
    const res = await http('/personalized/privatecontent/list', { offset, limit: 15 })
    this.getExclusiveList(res.result, res.more, res.offset)
  }
  render() {
    const { more, list } = this.state
    return (
      <div style={{padding: '0 90px'}}>
        <NavTitle title="独家放送" />
        <InfiniteScroll hasMore={more} useWindow={false} threshold={300}
          loadMore={this.throttle(this.loadMore, 2000)} 
          getScrollParent={() => this.context}>
          <ImgCardList list={list} flex="33.33%" showVideoIcon wrap />
        </InfiniteScroll>
        <BackTop visibilityHeight={1000} style={{right: '30px', bottom: '100px'}} 
          target={() => this.context} />
      </div>
    )
  }
}
