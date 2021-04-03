import { PureComponent, Fragment } from 'react'
import { RouteComponentProps } from 'react-router'
import http from 'utils/http'
import IconFont from 'components/IconFont'
import NavTitle from 'components/NavTitle'
import Category from 'components/Category'
import HighQualityList from 'components/HighQualityList'
import style from './index.module.scss'
export default class QualitySongList extends PureComponent<RouteComponentProps> {
  state = {
    categoryList: [],
    songList: [],
    before: 0, // 分页参数
    cat: ''
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
    this.getHighQualitySongList(res[1].playlists)
    // 获取当前的标签
    this.setState({ cat })
  }
  // 获取所有精品歌单标签
  getQualityTags(res: Array<Artist>) {
    const categoryList: Array<{sub: Array<{id: number, name: string}>}> = []
    categoryList[0] = { sub: res }
    this.setState({ categoryList })  
  }
  // 获取当前标签的精品歌单列表
  getHighQualitySongList(res: Array<HighQualitySongList>) {
    const { songList }: { songList: Array<HighQualitySongList> } = this.state
    res.forEach(value => {
      const { id, coverImgUrl, name, playCount, copywriter, creator, tag } = value
      const { nickname, userId, avatarDetail } = creator
      songList.push({
        id, name, playCount, copywriter, tag, coverImgUrl,
        creator: { nickname, userId, avatarDetail }
      })
    })
    const len = res.length
    this.setState({songList: [...songList], before: res[len - 1].updateTime!})
  }
  // 切换分类
  changeCategory = (cat: string) => {
    console.log(cat)
    this.setState({ cat })
  }
  render() {
    const { cat } = this.state
    const btnElement: JSX.Element = (
      <Fragment>
        <IconFont type="icon-choose" style={{fontSize:'14px', marginRight:'4px'}} />{cat}
      </Fragment>
    )
    const btnStyle = {fontSize: '13px', padding: '6px 10px'}
    // 获取所有精品歌单标签
    const { categoryList, songList } = this.state
    return (
      <div className={style['quality-songlist-container']}>
        <div className={style.header}>
          <NavTitle title="精品歌单" />
          <Category cardPosition="right" btnElement={btnElement} width={550} 
            categoryItemStyle={{flex: '20%', fontSize: '13px'}} changeCategory={this.changeCategory}
            btnTitle="全部歌单" btnStyle={btnStyle} categoryList={categoryList} />
        </div>
        <HighQualityList list={songList} />
      </div>
    )
  }
}