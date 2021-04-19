import { PureComponent, ChangeEvent, FocusEvent, Fragment } from 'react'
import { Input, List } from 'antd'
import { SearchOutlined, UserOutlined } from '@ant-design/icons'
import updateSong from '@containers/UpdateSong'
import http from '@utils/http'
import IconFont from '@components/IconFont'
import style from './index.module.scss'
interface HotList {
  searchWord: string // 搜索关键字
  score: number // 热度
  content: string // 描述词
  iconUrl: string | null  // Icon图标地址
}
interface CommonType {
  id: number
  name: string
  alias?: Array<string>
  artists?: Array<{id: number, name: string}>
}
interface SuggestInfo {
  artists?: Array<Artist>
  albums?: Array<{id: number, name: string, artist: Artist}>
  playlists?: Array<ItemType>
  songs?: Array<CommonType>
}
interface IProps {
  updatePlayInfo: (id: number, type: number) => void
}
class Search extends PureComponent<IProps> {
  state = {
    keywords: '',
    list: [],
    suggest: {},
    showList: false, // 是否显示当前搜索
    type: 0 // 0表示热搜列表，1表示搜索建议
  }
  componentDidMount() {
    window.addEventListener('click', this.closeList)
  }
  componentWillUnmount() {
    window.removeEventListener('click', this.closeList)
  }
  // 关闭热搜与搜索建议区域
  closeList = () => {
    this.setState({ showList: false })
  }
  // 获取热搜列表数据
  async getHotList() {
    const res = await http('/search/hot/detail')
    this.setState({ list: res.data })
  }
  // 热搜列表
  hotSearch(): JSX.Element {
    const { list, showList }: { list: Array<HotList>, showList: boolean } = this.state 
    return (
      <List itemLayout="horizontal" dataSource={list} bordered={false} header="热搜榜"
        className={style['hot-search-list']} style={{display: showList? 'block': 'none'}}
        renderItem={(item,index) => (
          <List.Item onClick={e => e.stopPropagation()}>
            <List.Item.Meta avatar={<div className={style.rank}>{index + 1}</div>}
              title={
                <div title={item.searchWord} >
                  {item.searchWord}{item.iconUrl?<img src={item.iconUrl} alt="" />:<></>}
                  <span style={{color: '#ccc', fontWeight:'normal', marginLeft:'5px'}}>
                    {item.score}
                  </span>
                </div>
              }
              description={item.content}/>
          </List.Item>
        )}
      />
    )
  }
  // 获取搜索建议数据
  async getSearchSuggest(keywords: string) {
    const res = await http('/search/suggest', { keywords })
    this.setState({ suggest: res.result })
  }
  // 搜索建议
  formatArtists(artists: Array<Artist>): JSX.Element {
    return (
      <Fragment>
        {
          artists.map(value => <span key={value.id}>{value.name}&nbsp;</span>)
        }
      </Fragment>
    )
  }
  // 歌曲
  songs(): JSX.Element {
    const { songs } = this.state.suggest as SuggestInfo
    if (!songs) return (<></>)
    const header = this.createHeader('music', '单曲')
    const { updatePlayInfo } = this.props
    return (
      <List header={header} dataSource={songs}
        renderItem={item => 
          <List.Item key={item.id} onClick={() => updatePlayInfo(item.id, 0)}>
            {item.name}
            {item.alias?.length ? `（${item.alias[0]}）` : <></>} - &nbsp;
            {this.formatArtists(item.artists!)}
          </List.Item>} />
    )
  }
  // 歌手 
  artists(): JSX.Element {
    const { artists } = this.state.suggest as SuggestInfo
    if (!artists) return (<></>)
    const header = (
      <Fragment>
        <UserOutlined style={{marginRight:'3px'}} />歌手
      </Fragment>
    )
    return (
      <List header={header} dataSource={artists}
        renderItem={item => <List.Item key={item.id}>{item.name}</List.Item>} />
    )
  }
  // 专辑
  albums(): JSX.Element {
    const { albums } = this.state.suggest as SuggestInfo
    if (!albums) return (<></>)
    const header = this.createHeader('album', '专辑')
    return (
      <List header={header} dataSource={albums}
        renderItem={item => 
          <List.Item key={item.id}>
            {item.name} - &nbsp;{item.artist.name}
          </List.Item>} />
    )
  }
  // 歌单
  songlist(): JSX.Element {
    const { playlists } = this.state.suggest as SuggestInfo
    if (!playlists) return (<></>)
    const header = this.createHeader('songlist', '歌单')
    return (
      <List header={header} dataSource={playlists}
        renderItem={item => <List.Item key={item.id}>{item.name}</List.Item>} />
    )
  }
  // Header Icon
  createHeader(icon: string, itemName: string): JSX.Element {
    return (
      <Fragment>
        <IconFont type={`icon-${icon}`} style={{marginRight:'3px', fontSize:'14px'}} />{itemName}
      </Fragment>
    )
  }
  searchSuggest(): JSX.Element {
    const { showList, keywords } = this.state
    return (
      <div className={style['search-suggestion']} style={{display: showList ? 'block' : 'none'}}>
        <div className={style['keywords']}>
          搜"<span style={{color: '#5984B3'}}>{keywords}</span>"相关的结果&gt;
        </div>
        {/* 单曲匹配结果 */}
        {this.songs()}
        {/* 歌手匹配结果 */}
        {this.artists()}
        {/* 专辑匹配结果 */}
        {this.albums()}
        {/* 歌单匹配结果 */}
        {this.songlist()}
      </div>
    )
  }
  // 搜索框聚焦
  focus = () => {
    this.setState({ showList: true })
    const { list, type } = this.state
    if (list.length === 0 && type === 0) this.getHotList()
  }
  // 搜索框离开
  blur = (e: FocusEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (value.trim()) return
    this.setState({ type: 0 })
  }
  // 用户输入
  input = (e: ChangeEvent<HTMLInputElement>) => {
    // 获取用户输入
    const { value } = e.target
    if (!value.trim()) return this.setState({ type: 0 })
    this.setState({ type: 1, keywords: value })
    window.setTimeout(() => this.getSearchSuggest(value), 1000)
  }
  render() {
    const { type } = this.state
    const icon = <SearchOutlined style={{color: '#fff', fontSize:'16px'}} />
    return (
      <div style={{position: 'relative'}}>
        <Input placeholder="搜索" bordered={false} className={style.search} onBlur={this.blur}
          prefix={icon} onFocus={this.focus} onClick={e => e.stopPropagation()} onChange={this.input} />
        {type === 0 ? this.hotSearch(): this.searchSuggest()}
      </div>
    )
  }
}

export default updateSong(Search)
