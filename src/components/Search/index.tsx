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
    type: 0 // 0表示热搜列表，1表示搜索建议
  }
  // 获取热搜列表数据
  async getHotList() {
    const res = await http('/search/hot/detail')
    this.setState({ list: res.data })
  }
  // 热搜列表
  hotSearch() {
    const { list }: { list: Array<HotList> } = this.state 
    return (
      <List itemLayout="horizontal" dataSource={list} bordered={false}
        className={style['hot-search-list']}
        renderItem={(item,index) => (
          <List.Item>
            <List.Item.Meta avatar={<div className={style.rank}>{index + 1}</div>}
              title={
                <div title={item.searchWord} >
                  {item.searchWord}
                  {item.iconUrl?<img src={item.iconUrl} alt="" />:<></>}
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
    this.getHotList()
  }
  render() {
    const { type } = this.state
    const icon = <SearchOutlined style={{color: '#fff', fontSize:'16px'}} />
    return (
      <div style={{position: 'relative'}}>
        <Input placeholder="搜索" bordered={false} className={style.search} 
          prefix={icon} onFocus={this.focus} />
        {type === 0 ? this.hotSearch(): <></>}
      </div>
    )
  }
}
