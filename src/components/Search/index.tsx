import { PureComponent } from 'react'
import { Input, List } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import http from '@utils/http'
import style from './index.module.scss'
interface HotList {
  searchWord: string // 搜索关键字
  score: number // 热度
  content: string // 描述词
  iconUrl: string | null  // Icon图标地址
}
export default class Search extends PureComponent {
  state = {
    input: '',
    list: [],
    showList: false,
    type: 0 // 0表示热搜列表，1表示搜索建议
  }
  componentDidMount() {
    window.onclick = () => this.setState({ showList: false })
  }
  componentWillUnmount() {
    window.onclick = null
  }
  // 获取热搜列表数据
  async getHotList() {
    const res = await http('/search/hot/detail')
    this.setState({ list: res.data })
  }
  // 热搜列表
  hotSearch() {
    const { list, showList }: { list: Array<HotList>, showList: boolean } = this.state 
    return (
      <List itemLayout="horizontal" dataSource={list} bordered={false}
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
  // 表单聚焦
  focus = () => {
    this.setState({ showList: true })
    if(this.state.list.length === 0)this.getHotList()
  }
  // 表单离开
  blur = () => {
    this.setState({ type: 0 })
  }
  // 用户输入
  input = () => {
    this.setState({ type: 1 })
    console.log('搜索')
  }
  render() {
    const { type } = this.state
    const icon = <SearchOutlined style={{color: '#fff', fontSize:'16px'}} />
    return (
      <div style={{position: 'relative'}}>
        <Input placeholder="搜索" bordered={false} className={style.search} onBlur={this.blur}
          prefix={icon} onFocus={this.focus} onClick={e => e.stopPropagation()} onChange={this.input} />
        {type === 0 ? this.hotSearch(): <></>}
      </div>
    )
  }
}
