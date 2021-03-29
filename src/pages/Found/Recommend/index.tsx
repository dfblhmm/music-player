import { PureComponent } from 'react'
import { Row, Col } from 'antd'
import http from 'utils/http'
import style from './index.module.scss'
import Carousel from 'components/Carousel'
import ImgCard from 'components/ImageCard'
import NavTitle from 'components/NavTitle'
export default class Recommend extends PureComponent {
  state = {
    banners: [],
    recommendSongList: [],
    exclusiveEntry: []
  }
  async componentDidMount() {
    // 并发获取数据
    const res = await http.all([
      { url: '/banner' },
      { url: '/personalized', data: {limit: 10} },
      { url: '/personalized/privatecontent' } 
    ])
    // 获取轮播图数据
    this.getBanners(res[0])
    // 获取推荐歌单
    this.getRecommendSongList(res[1])
    // 获取独家放送入口
    this.getExclusiveEntry(res[2])
  }
  // 获取轮播图数据
  getBanners(res: Data) {
    const banners: Array<Banners> = []
    res.banners.forEach((value: Banners) => {
      const { targetId, imageUrl, targetType, titleColor, typeTitle, url } = value
      banners.push({ 
        targetId, imageUrl: imageUrl + '?param?x566y200', 
        targetType, titleColor, typeTitle, url
      })
    })
    this.setState({banners})
  }
  // 获取推荐歌单
  getRecommendSongList(res: Data) {
    const recommendSongList: Array<ImgCardType> = []
    res.result.forEach((value: ImgCardType) => {
      const { id, picUrl, name, playCount } = value
      recommendSongList.push({
        id, picUrl: picUrl + 'param?x205y205', name, playCount
      })
    })
    this.setState({recommendSongList})
  }
  // 获取独家放送入口
  getExclusiveEntry(res: Data) {
    const exclusiveEntry: Array<ImgCardType> = []
    res.result.forEach((value: ImgCardType) => {
      const { id, name, sPicUrl: picUrl } = value
      exclusiveEntry.push({
        id, name, picUrl: picUrl! + '?param=x362y204'
      })
    })
    this.setState({exclusiveEntry})
  }
  render() {
    const { banners, recommendSongList, exclusiveEntry } = this.state
    return (
      <div className={style.container}>
        {/* 轮播图 */}
        <Carousel banners={banners} autoplay={false} />
        {/* 推荐歌单 */}
        <NavTitle to="/" title="推荐歌单" />
        <Row gutter={20} wrap={true}>
          {
            recommendSongList.map((value: ImgCardType) => 
              <Col key={value.id} className={style['col-songlist']}>
                <ImgCard showPlayIcon {...value} />
              </Col>
            )
          }
        </Row>
        {/* 独家放送入口 */}
        <NavTitle to="/" title="独家放送" />
        <Row gutter={20} wrap={true}>
          {
            exclusiveEntry.map((value: ImgCardType) => 
              <Col key={value.id} className={style['col-exclusive']}>
                <ImgCard showVideoIcon {...value} />
              </Col>
            )
          }
        </Row>
        
      </div>
    )
  }
}
