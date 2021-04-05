import { PureComponent } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import http from '@utils/http'
import NavTitle from '@components/NavTitle'
import ImgCardList from '@components/ImgCardList'
import './index.scss'
export default class Exclusive extends PureComponent {
  state = {
    more: false,
    offset: 0,
    list: []
  }
  async componentDidMount() {
    const res = await http('/personalized/privatecontent/list', { limit: 30 })
    this.getExclusiveList(res.result, res.more, res.offset)
  }
  // 获取独家放送列表
  getExclusiveList(res: Array<ImgCardItemType>, more: boolean, offset: number) {
    const { list }: { list: Array<ImgCardItemType> } = this.state
    res.forEach(value => {
      const { id, sPicUrl, name } = value
      list.push({ id, picUrl: sPicUrl!, name })
    })
    this.setState({more, list, offset})
  }
  // 加载更多数据
  loadMore = async() => {
    // const { offset } = this.state
    // const res = await http('/personalized/privatecontent/list', {limit: 30, offset})
    // this.getExclusiveList(res.result, res.more, res.offset)
    console.log('请求')
  }
  render() {
    const { more, list } = this.state
    return (
      <div className="exclusive-container">
        <NavTitle title="独家放送" />
        {/* <InfiniteScroll hasMore={more} loadMore={this.loadMore} 
          useWindow={false}>
        </InfiniteScroll> */}
        <ImgCardList list={list} flex="33.33%" showVideoIcon wrap height={300} />
      </div>
    )
  }
}
