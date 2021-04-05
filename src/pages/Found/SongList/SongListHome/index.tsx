import { Fragment, PureComponent } from 'react'
import { RouteComponentProps } from 'react-router'
import { Image, BackTop, Pagination } from 'antd'
import { nanoid } from 'nanoid'
import targetContext from '../../context'
import IconFont from '@components/IconFont'
import http from '@utils/http'
import Category from '@components/Category'
import ImgCardList from '@components/ImgCardList'
import style from './index.module.scss'
interface TopQuality {
  name: string
  copywriter: string
  coverImgUrl: string 
}
interface SongListType extends ImgCardItemType {
  creator: {userId: number, nickname: string, avatarDetail?: {identityIconUrl: string}}
  coverImgUrl: string
}
export default class SongListHome extends PureComponent<RouteComponentProps> {
  static contextType = targetContext
  state = {
    categoryList: [], // 分类列表
    hotCategoryList: [], // 热门分类列表
    highQualityTags: [], // 精品标签
    showTopQuality: true, // 是否显示顶部精品歌单区域
    topHighQualityInfo: {}, // 顶部精品歌单信息
    songList: [], // 歌单
    total: 0, // 当前分类的歌单总数
    current: 1, // 当前的页数
    cat: '全部歌单' // 当前的分类
  }
  async componentDidMount() {
    const res = await http.all([
      { url: '/top/playlist/highquality', data: { limit: 1 } },
      { url: '/playlist/hot' },
      { url: '/playlist/highquality/tags' },
      { url: '/playlist/catlist' },
      { url: '/top/playlist', data: { limit: 100, order: 'hot' } },
    ])
    // 获取顶部精品歌单信息
    this.getTopHighQuality(res[0].playlists[0])
    // 获取热门分类
    this.getHotCategory(res[1].tags)
    // 获取精品歌单标签列表
    this.getTopHighQualityTags(res[2].tags)
    // 获取全部歌单分类
    this.getAllCategory(res[3])
    // 获取歌单
    this.getSongList(res[4].playlists)
    // 更新歌单总数
    this.setState({total: res[4].total})
  }
  // 获取顶部精品歌单
  getTopHighQuality(res: TopQuality) {
    const {name, copywriter, coverImgUrl}  = res
    const topHighQualityInfo = { name, copywriter, coverImgUrl: coverImgUrl + '?param=x140y140' }
    this.setState({topHighQualityInfo})
  }
  // 获取全部分类
  getAllCategory(res: {categories: {[key: string]: string}, sub: Array<{name: string, hot: boolean, category: number}>}) {
    const { categories, sub } = res
    const categoryList: Array<{ category: string, icon: string, sub: Array<{name: string, hot: boolean}>}> = []
    // 主分类的icon图标
    const icons: string[] = ['icon-global', 'icon-style', 'icon-scene', 'icon-face', 'icon-theme']
    for (const key in categories) {
      const index = parseInt(key)
      categoryList[index] = { category: categories[key], sub: [], icon: icons[index] }
    }
    sub.forEach(subItem => {
      const { category, name, hot } = subItem
      categoryList[category].sub.push({ name, hot })
    })
    this.setState({categoryList})
  }
  // 获取热门分类
  getHotCategory(tags: Array<{playlistTag: {id: number, name: string} }>) {
    const hotCategoryList: Array<{ id: number, name: string }> = []
    tags.forEach(value => {
      const { id, name } = value.playlistTag
      hotCategoryList.push({id, name})
    })
    this.setState({hotCategoryList})
  }
  // 获取精品歌单标签列表
  getTopHighQualityTags(res: Array<{name: string}>) {
    const highQualityTags: string[] = []
    res.forEach(tag => highQualityTags.push(tag.name))
    highQualityTags.push('全部歌单')
    this.setState({highQualityTags})
  }
  // 改变分类
  changeCategory = async (cat: string) => {
    //更新顶部精品歌单
    const { highQualityTags }: { highQualityTags: string[] } = this.state
    if (!highQualityTags.includes(cat)) this.setState({showTopQuality: false})
    else {
      const res = await http('/top/playlist/highquality', {limit: 1, cat})
      this.getTopHighQuality(res.playlists[0])
      this.setState({showTopQuality: true})
    }
    // 更新歌单区域
    const songlist = await http('/top/playlist', { limit: 100, order: 'hot', cat })
    this.getSongList(songlist.playlists as Array<SongListType>)
    // 页码重置
    this.setState({current: 1, cat})
  }
  // 获取当前分类的歌单列表
  getSongList(res: Array<SongListType>) {
    const songList: Array<ImgCardItemType> = []
    const ids: {[key: string]: boolean} = {}
    res.forEach(value => {
      const { id, name, playCount, creator, coverImgUrl } = value 
      const { userId, nickname, avatarDetail } = creator
      let nid = ''
      // 遇到重复的项目使用nanoid进行替换
      if (ids[id]) {
        nid = nanoid()
      } else {
        ids[id] = true
      }
      songList.push({
        name, id, playCount, picUrl: coverImgUrl + '?param=x205y205', 
        creatorInfo: {userId, nickname, avatarDetail}, nid
      })
    })
    this.setState({songList})
  }
  // 改变页码
  changePage = async (currentPage: number) => {
    // 获取新的歌单列表
    const offset = (currentPage - 1) * 100
    const res = await http('/top/playlist', { limit: 100, order: 'hot', offset})
    this.getSongList(res.playlists);
    // 页面回到顶部
    (this.context as HTMLElement).scrollTop = 0 
    // 更新页数
    this.setState({current: currentPage})
  }
  // 前往精品歌单页面
  goQualityPage = () => {
    const { cat } = this.state
    const { history: { push } } = this.props
    push(`/found/songlist/quality/${cat}`)
  }
  render() {
    const { categoryList, hotCategoryList, showTopQuality, songList, cat } = this.state
    // 选择按钮
    let btnElement: JSX.Element = <></>
    if (cat === 'Bossa Nova') btnElement = <Fragment>Bossa</Fragment>
    else btnElement = (
      <Fragment>{cat}<IconFont type="icon-arrow-right"/></Fragment>
    )
    // 顶部精品歌单信息
    const { name, copywriter, coverImgUrl } = this.state.topHighQualityInfo as TopQuality
    // 分页器数据
    const { total, current } = this.state
    // 分类选择样式
    const btnStyle = { width: '100px', height: '30px', padding: '0'}
    return (
      <div style={{padding: '0 90px'}}>
        {/* 头部精品歌单区域 */}
        <div className={style['top-high-quality']} onClick={this.goQualityPage}
          style={{display: showTopQuality?'flex':'none'}} >
          <div className={style['high-quality-img']}><Image src={coverImgUrl} preview={false} /></div>
          <div className={style['high-quality-info']}>
          <div className={style.tip}><IconFont type="icon-quality" className={style.icon} />精品歌单</div>
            <div className={style['high-quality-name']}>{name}</div>
            <div className={style['high-quality-desc']}>{copywriter}</div>
          </div>
        </div>
        {/* 歌单标签切换区域 */}
        <Category cardPosition={'left'} categoryList={categoryList} btnStyle={btnStyle}
          changeCategory={this.changeCategory} btnTitle={'全部歌单'} categoryItemStyle={{flex:'"16.6%"'}}
          btnElement={btnElement} width={746} hotCategoryList={hotCategoryList} />
        {/* 歌单区域 */}
        <ImgCardList flex="20%" wrap list={songList} showPlayIcon width={205} height={205} />
        {/* 回到顶部 */}
        <BackTop visibilityHeight={1000} target={()=>this.context}
          style={{right: '30px', bottom: '100px'}} />
        {/* 分页器 */}
        <div className={style.pagination}>
          <Pagination pageSize={100} current={current} showSizeChanger={false}
            onChange={page => this.changePage(page)}  total={total} />
        </div>
      </div>
    )
  }
}
