import { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'antd'
import http from 'utils/http'
import IconFont from 'components/IconFont'
import style from './index.module.scss'
import Carousel from 'components/Carousel'
import ImgCard from 'components/ImageCard'
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
      const { targetId, imageUrl, targetType, titleColor, typeTitle, url } = value
      banners.push({ 
        targetId, imageUrl: imageUrl + '?param?x566y200', 
        targetType, titleColor, typeTitle, url
      })
    })
    this.setState({banners})
  }
  // 获取推荐歌单
  getRecommendSongList(res: any) {
    const recommendSongList: Array<ImgCardType> = []
    res.result.forEach((value: ImgCardType) => {
      const { id, picUrl, name, playCount } = value
      recommendSongList.push({
        id, picUrl: picUrl + 'param?x205y205', name, 
        showPlayCount: true, playCount
      })
    })
    this.setState({recommendSongList})
  }
  render() {
    const { banners, recommendSongList } = this.state
    return (
      <div className={style.container}>
        {/* 轮播图 */}
        <Carousel banners={banners} autoplay={false} />
        <Link to="/" className={style.title}>
          推荐歌单<IconFont type="icon-arrow-right" style={{fontSize:'17px', fontWeight:'bold'}}/>
        </Link>
        {/* 推荐歌单 */}
        <Row gutter={20} wrap={true}>
          {
            recommendSongList.map((value: ImgCardType) => 
              <Col key={value.id} className={style.col}><ImgCard {...value} /></Col>
            )
          }
        </Row>
        <Link to="/" className={style.title}>
          独家放送<IconFont type="icon-arrow-right" style={{fontSize:'17px', fontWeight:'bold'}}/>
        </Link>
        {/* 独家放送 */}
        
      </div>
    )
  }
}
