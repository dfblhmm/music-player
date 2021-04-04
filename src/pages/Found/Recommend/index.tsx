import { PureComponent } from 'react'
import http from '@/utils/http'
import Carousel from '@/components/Carousel'
import ImgCardList from '@/components/ImgCardList'
import NavTitle from '@/components/NavTitle'
import NewSong from './NewSong'
export default class Recommend extends PureComponent {
  state = {
    banners: [],
    recommendSongList: [],
    exclusiveEntry: [],
    recommendMV: [],
    newSongs: [],
    radios: []
  }
  async componentDidMount() {
    // 并发获取数据
    const res = await http.all([
      { url: '/banner' },
      { url: '/personalized', data: { limit: 10 } },
      { url: '/personalized/privatecontent' },
      { url: '/personalized/mv' },
      { url: 'personalized/newsong', data: { limit: 9 } },
      { url: '/dj/hot', data: { limit: 6 } } 
    ])
    // 获取轮播图数据
    this.getBanners(res[0].banners)
    // 获取推荐歌单
    this.getRecommendSongList(res[1].result)
    // 获取独家放送入口
    this.getExclusiveEntry(res[2].result)
    // 获取推荐MV
    this.getRecommendMV(res[3].result)
    // 获取最新音乐
    this.getNewSongs(res[4].result)
    // 获取主播电台
    this.getRadios(res[5].djRadios) 
  }
  // 获取轮播图数据
  getBanners(res: Data) {
    const banners: Array<Banners> = []
    res.forEach((value: Banners) => {
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
    const recommendSongList: Array<ImgCardItemType> = []
    res.forEach((value: ImgCardItemType) => {
      const { id, picUrl, name, playCount } = value
      recommendSongList.push({
        id, picUrl: picUrl + 'param?x205y205', name, playCount
      })
    })
    this.setState({recommendSongList})
  }
  // 获取独家放送入口
  getExclusiveEntry(res: Data) {
    const exclusiveEntry: Array<ImgCardItemType> = []
    res.forEach((value: ImgCardItemType) => {
      const { id, name, sPicUrl: picUrl } = value
      exclusiveEntry.push({
        id, name, picUrl: picUrl! + '?param=x362y204'
      })
    })
    this.setState({exclusiveEntry})
  }
  // 获取推荐MV
  getRecommendMV(res: Data) {
    const recommendMV: Array<ImgCardItemType> = []
    res.forEach((value: ImgCardItemType) => {
      const { id, name, picUrl, playCount, artists } = value
      recommendMV.push({
         id, name, picUrl: picUrl + '?param=x266y150', 
         playCount, artists, maskTitle: '最新热门MV推荐' 
      })
    })
    this.setState({recommendMV})
  }
  // 获取最新音乐
  getNewSongs(res: Data) {
    const newSongs: Array<SongItem> = []
    res.forEach((value: Data) => {
      const { id, name, picUrl } = value
      const artists: Array<Artist> = value.song.artists
      const mvid: number = value.song.mvid
      const maxbr: number = value.song.privilege.maxbr
      const alias: string = value.song.alias[0]
      newSongs.push({
        id, name, picUrl: picUrl + '?param=x55y55', artists,
        maxbr, mvid, alias
      })
    })

    this.setState({newSongs})
  }
  // 获取主播电台
  getRadios(res: Data) {
    const radios: Array<ImgCardItemType> = []
    res.forEach((value: ImgCardItemType) => {
      const { id, name, rcmdtext, picUrl } = value
      radios.push({
        id, name: rcmdtext!, picUrl, rcmdtext: name
      })
    })
    this.setState({radios})
  }
  render() {
    const { banners, recommendSongList, exclusiveEntry, recommendMV, newSongs, radios } = this.state
    return (
      <div style={{padding: '0 90px'}}>
        {/* 轮播图 */}
        <Carousel banners={banners} autoplay={false} />
        {/* 推荐歌单 */}
        <NavTitle to="/found/songlist" title="推荐歌单" />
        <ImgCardList list={recommendSongList} flex="20%" wrap showPlayIcon />
        {/* 独家放送入口 */}
        <NavTitle to="/" title="独家放送" />
        <ImgCardList list={exclusiveEntry} flex="1" showVideoIcon />
        {/* 最新音乐 */}
        <NavTitle to="/" title="最新音乐" />
        <NewSong songItems={newSongs} />
        {/* 推荐MV */}
        <NavTitle to="/" title="推荐MV" />
        <ImgCardList list={recommendMV} flex="25%" ellipsis width={266} height={150} />
        {/* 主播电台 */}
        <NavTitle to="/video" title="主播电台" />
        <ImgCardList list={radios} flex="1" />
      </div>
    )
  }
}
