import { PureComponent } from 'react'
import http from 'utils/http'
import HighQuality from 'components/HighQualityItem'
import Category from 'components/Category'
import style from './index.module.scss'
export default class SongListHome extends PureComponent {
  state = {
    categoryList: []
  }
  async componentDidMount() {
    const res = await http.all([
      { url: '/top/playlist/highquality', data: { limit: 1 } },
      { url: '/playlist/catlist' }
    ])
    this.getTopHighQuality(res[0])
    this.getAllCategory(res[1])
  }
  // 获取顶部精品歌单
  getTopHighQuality(res: Data) {
   
  }
  // 获取全部分类
  getAllCategory(res: {categories: Data, sub: Array<{name: string, hot: boolean, category: number}>}) {
    const { categories, sub } = res
    const categoryList: Array<{ category: string, sub: Array<{name: string, hot: boolean}>}> = []
    for (const key in categories) {
      const index = parseInt(key)
      categoryList[index] = { category: categories[key], sub: [] }
    }
    sub.forEach(subItem => {
      const { category, name, hot } = subItem
      categoryList[category].sub.push({ name, hot })
    })
    this.setState({categoryList})
  }
  render() {
    const { categoryList } = this.state
    return (
      <div style={{padding: '0 90px'}}>
        <div className={style['top-high-quality']}><HighQuality margin="20px 0 12px" /></div>
        <Category categoryList={categoryList} btnTitle="全部歌单" />
      </div>
    )
  }
}
