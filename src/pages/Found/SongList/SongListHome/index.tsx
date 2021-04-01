import { PureComponent } from 'react'
import http from 'utils/http'
import HighQualityItem from 'components/HighQualityItem'
import Category from 'components/Category'
import style from './index.module.scss'
export default class SongListHome extends PureComponent {
  state = {
    categoryList: [],
    hotCategoryList: []
  }
  async componentDidMount() {
    const res = await http.all([
      { url: '/top/playlist/highquality', data: { limit: 1 } },
      { url: '/playlist/catlist' },
      { url: '/playlist/hot' }
    ])
    // 获取顶部精品歌单信息
    this.getTopHighQuality(res[0])
    // 获取全部歌单分类
    this.getAllCategory(res[1])
    // 获取热门分类
    this.getHotCategory(res[2].tags)
  }
  // 获取顶部精品歌单
  getTopHighQuality(res: Data) {
   
  }
  // 获取全部分类
  getAllCategory(res: {categories: Data, sub: Array<{name: string, hot: boolean, category: number}>}) {
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
  getHotCategory(tags: Array<{ id: number, name: string }>) {
    const hotCategoryList: Array<{ id: number, name: string }> = []
    tags.forEach(value => {
      const { id, name } = value
      hotCategoryList.push({id, name})
    })
    this.setState({hotCategoryList})
  }
  // 改变分类
  changeCategory = async (cat: string) => {
    const res = await http('/top/playlist/highquality', {limit: 1, cat})
    console.log(res)
  }
  render() {
    const { categoryList, hotCategoryList } = this.state
    return (
      <div style={{padding: '0 90px'}}>
        <div className={style['top-high-quality']}><HighQualityItem margin="20px 0 12px" /></div>
        <Category cardPosition={'left'} categoryList={categoryList} 
          changeCategory={this.changeCategory}
          btnTitle="全部歌单" width={746} hotCategoryList={hotCategoryList} />
      </div>
    )
  }
}
