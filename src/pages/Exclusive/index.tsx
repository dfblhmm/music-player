import { PureComponent } from 'react'
import { BackTop } from 'antd'
import InfiniteScroll from 'react-infinite-scroller'
import http from '@utils/http'
import NavTitle from '@components/NavTitle'
import ImgCardList from '@components/ImgCardList'
import './index.scss'
export default class Exclusive extends PureComponent {
  target!: HTMLElement | null
  state = {
    more: false,
    offset: 0,
    list: []
  }
  async componentDidMount() {
    const res = await http('/personalized/privatecontent/list')
    this.getExclusiveList(res.result, res.more, res.offset)
  }
  // 获取独家放送列表
  getExclusiveList(res: Array<ImgCardItemType>, more: boolean, offset: number) {
    const { list }: { list: Array<ImgCardItemType> } = this.state
    res.forEach(value => {
      const { id, sPicUrl, name } = value
      list.push({ id, picUrl: sPicUrl!, name })
    })
    this.setState({more, list: [...list], offset})
  }
  // 加载更多数据
  loadMore = async() => {
    const { offset } = this.state
    const res = await http('/personalized/privatecontent/list', {offset})
    this.getExclusiveList(res.result, res.more, res.offset)
  }
  render() {
    const { more, list } = this.state
    return (
      <div className="exclusive-container" ref={c => this.target = c} >
        <NavTitle title="独家放送" />
        <InfiniteScroll hasMore={more} loadMore={this.loadMore} 
          useWindow={false} threshold={0} >
          <ImgCardList list={list} flex="33.33%" showVideoIcon wrap />
        </InfiniteScroll>
        <BackTop visibilityHeight={1000} style={{right: '30px', bottom: '100px'}} 
          target={() => (this.target as HTMLElement)} />
      </div>
    )
  }
}
