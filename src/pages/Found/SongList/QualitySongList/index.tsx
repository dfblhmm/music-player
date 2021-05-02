import { PureComponent, Fragment } from 'react'
import { RouteComponentProps } from 'react-router'
import { message, BackTop } from 'antd'
import InfiniteScroll from 'react-infinite-scroller'
import target from '@components/Main/context'
import http from '@/utils/http'
import throttle, { TypeOfThrottle } from '@utils/throttle'
import IconFont from '@/components/IconFont'
import NavTitle from '@/components/NavTitle'
import Category from '@/components/Category'
import HighQualityList from './HighQualityList'
import style from './index.module.scss'
export default class QualitySongList extends PureComponent<RouteComponentProps> {
  static contextType = target
  timer: number | undefined
  throttle: TypeOfThrottle
  state = {
    categoryList: [],
    songList: [],
    before: 0, // 分页参数
    cat: '',
    more: false
  }
  // 初始化节流函数
  constructor(props: RouteComponentProps) {
    super(props)
    this.throttle = throttle
  }
  async componentDidMount() {
    const { match: { params }} = this.props
    const { cat } = params as { cat: string }
    const res = await http.all([
      { url: '/playlist/highquality/tags' },
      { url: '/top/playlist/highquality', data: { limit: 30, cat } }
    ])
    // 获取所有精品歌单标签
    this.getQualityTags(res[0].tags)
    // 获取当前标签的精品歌单列表
    this.getHighQualitySongList(res[1].playlists, res[1].more)
    // 获取当前的标签
    this.setState({ cat })
  }
  // 获取所有精品歌单标签
  getQualityTags(res: Array<Artist>) {
    const categoryList: Array<{sub: Array<{id: number, name: string}>}> = []
    categoryList[0] = { sub: res }
    this.setState({ categoryList })  
  }
  // 追加数据
  updateData(res: Array<HighQualitySongList>): Array<HighQualitySongList> {
    const { songList }: { songList: Array<HighQualitySongList> } = this.state
    res.forEach(value => {
      const { id, coverImgUrl, name, playCount, copywriter, creator, tag } = value
      const { nickname, userId, avatarDetail } = creator
      songList.push({
        id, name, playCount, copywriter, tag, coverImgUrl: coverImgUrl + '?param=x135y135',
        creator: { nickname, userId, avatarDetail }
      })
    })
    return songList
  }
  // 获取当前标签的精品歌单列表
  getHighQualitySongList(res: Array<HighQualitySongList>, more: boolean) {
    const songList = this.updateData(res)
    const len = res.length
    this.setState({songList: [...songList], before: res[len - 1].updateTime!, more})
  }
  // 加载更多数据
  loadMore = async () => {
    const { before, cat, more } = this.state
    if (!more) return message.warning('没有更多了') 
    const res = await http('/top/playlist/highquality', { limit: 15, cat, before }) as {
      more: boolean, playlists: Array<HighQualitySongList>
    }
    this.getHighQualitySongList(res.playlists, res.more)
  }
  // 切换分类
  changeCategory = async (cat: string) => {
    this.setState({ cat, songList: [] })
    const res = await http('/top/playlist/highquality', { limit: 30, cat })
    this.getHighQualitySongList(res.playlists, res.more)
  }
  render() {
    const { cat, more } = this.state
    const btnElement: JSX.Element = (
      <Fragment>
        <IconFont type="icon-choose" style={{fontSize:'14px', marginRight:'4px'}} />{cat}
      </Fragment>
    )
    const btnStyle = {fontSize: '13px', padding: '6px 10px'}
    // 获取所有精品歌单标签
    const { categoryList, songList } = this.state
    const { changeCategory, context, loadMore } = this
    return (
      <div className={style['quality-songlist-container']} >
        <div className={style.header}>
          <NavTitle title="精品歌单" />
          <Category cardPosition="right" btnElement={btnElement} width={550} 
            categoryItemStyle={{flex: '20%', fontSize: '13px'}} changeCategory={changeCategory}
            btnTitle="全部歌单" btnStyle={btnStyle} categoryList={categoryList} />
        </div>
        <InfiniteScroll loadMore={this.throttle(loadMore, 300)} useWindow={false} 
          threshold={300} hasMore={more} getScrollParent={() => this.context}>
          <HighQualityList list={songList} />
        </InfiniteScroll>
        <BackTop visibilityHeight={1000} target={() => context}
          style={{right: '30px', bottom: '100px'}} />
      </div>
    )
  }
}