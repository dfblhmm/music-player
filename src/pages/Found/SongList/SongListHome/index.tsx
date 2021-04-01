import { PureComponent } from 'react'
import http from 'utils/http'
import HighQualityItem from 'components/HighQualityItem'
import Category from 'components/Category'
import style from './index.module.scss'
export default class SongListHome extends PureComponent {
  state = {
    categoryList: [],
    hotCategoryList: [],
    highQualityTags: [], 
    showTopQuality: true
  }
  async componentDidMount() {
    const res = await http.all([
      { url: '/top/playlist/highquality', data: { limit: 1 } },
      { url: '/playlist/hot' },
      { url: '/playlist/highquality/tags' },
      { url: '/playlist/catlist' }
    ])
    // 获取顶部精品歌单信息
    this.getTopHighQuality(res[0])
    // 获取热门分类
    this.getHotCategory(res[1].tags)
    // 获取精品歌单标签列表
    this.getTopHighQualityTags(res[2].tags)
    // 获取全部歌单分类
    this.getAllCategory(res[3])
  }
  // 获取顶部精品歌单
  getTopHighQuality(res: Data) {
   
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
    this.setState({highQualityTags})
  }
  // 改变分类
  changeCategory = async (cat: string) => {
    const { highQualityTags }: { highQualityTags: string[] } = this.state
    if (!highQualityTags.includes(cat)) return this.setState({showTopQuality: false})
    const res = await http('/top/playlist/highquality', {limit: 1, cat})
    console.log(res)
  }
  render() {
    const { categoryList, hotCategoryList, showTopQuality } = this.state
    return (
      <div style={{padding: '0 90px'}}>
        <div className={style['top-high-quality']} style={{display: showTopQuality?'flex':'none'}} >
          { showTopQuality ? <HighQualityItem margin="20px 0 12px" />: <></>}
        </div>
        <Category cardPosition={'left'} categoryList={categoryList} 
          changeCategory={this.changeCategory}
          btnTitle="全部歌单" width={746} hotCategoryList={hotCategoryList} />
      </div>
    )
  }
}
