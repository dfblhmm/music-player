import { PureComponent } from 'react'
import { Row, Col } from 'antd'
import http from 'utils/http'
import IconFont from 'components/IconFont'
import style from './index.module.scss'
import Carousel from 'components/Carousel'
import SongList from 'components/SongList'
interface Banners {
  imageUrl: string
  targetId: number
}
interface RecommendList {
  id: number
  name: string
  playCount: number
  picUrl: string
}
export default class Recommend extends PureComponent {
  state = {
    banners: [],
    recommendSongList: []
  }
  async componentDidMount() {
    // 并发获取数据
    const res = await http.all([
      { url: '/banner' },
      { url: '/personalized', data: {limit: 10} } 
    ])
    // 获取轮播图数据
    this.getBanners(res[0])
    // 获取推荐歌单
    this.getRecommendSongList(res[1])
  }
  // 获取轮播图数据
  getBanners(res: any) {
    const banners: Array<Banners> = []
    res.banners.forEach((value: Banners) => {
      banners.push({ imageUrl: value.imageUrl + '?param=566y200', targetId: value.targetId })
    })
    this.setState({banners})
  }
  // 获取推荐歌单
  getRecommendSongList(res: any) {
    const recommendSongList: Array<RecommendList> = []
    res.result.forEach((value: RecommendList) => {
      recommendSongList.push({
         id: value.id, name: value.name, 
         picUrl: value.picUrl + '?param=205y205', playCount: value.playCount
      })
    })
    this.setState({recommendSongList})
  }
  render() {
    const { banners, recommendSongList } = this.state
    return (
      <div className={style.container}>
        <Carousel banners={banners} />
        <div className={style.title}>
          推荐歌单<IconFont type="icon-arrow-right" style={{fontSize:'17px', fontWeight:'bold'}}/>
        </div>
        <Row gutter={20} wrap={true}>
          {
            recommendSongList.map((value: RecommendList) => 
              <Col key={value.id} className={style.col}><SongList {...value} /></Col>
            )
          }
        </Row>
      </div>
    )
  }
}
