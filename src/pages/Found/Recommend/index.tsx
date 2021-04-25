import { PureComponent } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { nanoid } from 'nanoid'
import LoginStatus from '@containers/LoginStatus'
import http from '@utils/http'
import Carousel from '@components/Carousel'
import ImgCardList from '@components/ImgCardList'
import NavTitle from '@components/NavTitle'
import NewSong from './NewSong'
import picUrl from '@assets/images/daily.jpg'
interface IProps extends RouteComponentProps {
  loginInfo: LoginType
}
interface IState {
  banners: Array<Banners>,
  recommendSongList: Array<ImgCardItemType>,
  exclusiveEntry: Array<ImgCardItemType>,
  recommendMV: Array<ImgCardItemType>,
  newSongs: Array<SongItem>,
  radios: Array<ImgCardItemType>
}
class Recommend extends PureComponent<IProps, IState> {
  state: IState = {
    banners: [],
    recommendSongList: [],
    exclusiveEntry: [],
    recommendMV: [],
    newSongs: [],
    radios: []
  }
  async componentDidUpdate(prevProps: IProps) {
    const preLogin = prevProps.loginInfo.isLogin
    const login = this.props.loginInfo.isLogin
    if (preLogin === login) return
    // 更新推荐歌单
    this.updateRecommendSongList(login)
  }
  async componentDidMount() {
    // 并发获取数据
    const res = await http.all([
      { url: '/banner' },
      { url: '/personalized/privatecontent' },
      { url: '/personalized/mv' },
      { url: 'personalized/newsong', data: { limit: 12 } },
      { url: '/dj/hot', data: { limit: 6 } } 
    ])
    // 获取轮播图数据
    this.getBanners(res[0].banners)
    // 获取独家放送入口
    this.getExclusiveEntry(res[1].result)
    // 获取推荐MV
    this.getRecommendMV(res[2].result)
    // 获取最新音乐
    this.getNewSongs(res[3].result)
    // 获取主播电台
    this.getRadios(res[4].djRadios) 
    // 获取推荐歌单
    this.updateRecommendSongList(this.props.loginInfo.isLogin)
  }
  // 获取轮播图数据
  getBanners(res: Array<Banners>) {
    const banners: Array<Banners> = []
    res.forEach(value => {
      const { targetId, imageUrl, targetType, titleColor, typeTitle, url } = value
      banners.push({ 
        targetId, imageUrl: imageUrl + '?param?x566y200', 
        targetType, titleColor, typeTitle, url
      })
    })
    this.setState({ banners })
  }
  // 获取推荐歌单
  getRecommendSongList(res: Array<ImgCardItemType>, isLogin?: boolean) {
    const recommendSongList: Array<ImgCardItemType> = []
    res.forEach((value, index) => {
      if (index > 8 && isLogin) return
      const { id, picUrl, name, playCount, playcount } = value
      recommendSongList.push({
        id, picUrl: picUrl + 'param?x205y205', name,
        playCount: playCount ? playCount : playcount
      })
    })
    // 是否加入日推歌单
    isLogin && recommendSongList.unshift({ 
      id: nanoid(), name: '每日推荐歌单', picUrl, 
      maskTitle: '根据您的音乐口味生成 | 每日更新'  
    })
    this.setState({ recommendSongList })
  }
  // 根据登录状态更新推荐歌单
  async updateRecommendSongList(login: boolean) {
    if (login) {
      const res = await http('/recommend/resource')
      this.getRecommendSongList(res.recommend, login)
    } else {
      const res = await http('/personalized', { limit: 10 })
      this.getRecommendSongList(res.result)
    }
  }
  // 获取独家放送入口
  getExclusiveEntry(res: Array<ImgCardItemType>) {
    const exclusiveEntry: Array<ImgCardItemType> = []
    res.forEach(value => {
      const { id, name, sPicUrl: picUrl } = value
      exclusiveEntry.push({
        id, name, picUrl: picUrl! + '?param=x362y204'
      })
    })
    this.setState({ exclusiveEntry })
  }
  // 获取推荐MV
  getRecommendMV(res: Array<ImgCardItemType>) {
    const recommendMV: Array<ImgCardItemType> = []
    res.forEach(value => {
      const { id, name, picUrl, playCount, artists } = value
      recommendMV.push({
         id, name, picUrl: picUrl + '?param=x266y150', 
         playCount, artists, maskTitle: '最新热门MV推荐' 
      })
    })
    this.setState({ recommendMV })
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
    this.setState({ newSongs })
  }
  // 获取主播电台
  getRadios(res: Array<ImgCardItemType>) {
    const radios: Array<ImgCardItemType> = []
    res.forEach(value => {
      const { id, name, rcmdtext, picUrl } = value
      radios.push({
        id, name: rcmdtext!, picUrl, rcmdtext: name
      })
    })
    this.setState({ radios })
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
        <NavTitle to="/found/exclusive" title="独家放送" />
        <ImgCardList list={exclusiveEntry} flex="1" showVideoIcon />
        {/* 最新音乐 */}
        <NavTitle to="/found/new-songs" title="最新音乐" />
        <NewSong songItems={newSongs} />
        {/* 推荐MV */}
        <NavTitle to="/" title="推荐MV" />
        <ImgCardList list={recommendMV} flex="25%" ellipsis />
        {/* 主播电台 */}
        <NavTitle to="/video" title="主播电台" />
        <ImgCardList list={radios} flex="1" />
      </div>
    )
  }
}

export default withRouter(LoginStatus(Recommend))

