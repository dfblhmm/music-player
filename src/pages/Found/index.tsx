import { PureComponent, lazy } from 'react'
import { Route, Redirect, Switch, RouteComponentProps } from 'react-router-dom'
import { Menu, Affix } from 'antd'
import './index.scss'
const Recommend = lazy(() => import('./Recommend'))
const SongList = lazy(() => import('./SongList'))
export default class Found extends PureComponent<RouteComponentProps> {
  target!: HTMLElement | null
  state = {
    selectedKeys: ['recommend'], // 当前选中的菜单项
  }
  componentDidMount() {
    const { location: { pathname } } = this.props
    const paths = pathname.split('/')
    const path = paths[paths.length - 1]
    this.setState({selectedKeys: [path]})
  }
  // 切换菜单选项
  handleClick = (e: { key: unknown }) => {
    const key = e.key as string
    const { history: { push } } = this.props
    if (key === this.state.selectedKeys[0]) return
    push(`/found/${key}`)
    this.setState({selectedKeys: [key]})
  }
  render() {
    const { selectedKeys } = this.state
    return (
      <div className="found-container" ref={c => this.target = c}>
        <Affix offsetTop={0} target={() => this.target}>
          <Menu selectedKeys={selectedKeys} mode="horizontal" onClick={this.handleClick}>
            <Menu.Item key="recommend">个性推荐</Menu.Item>
            <Menu.Item key="songlist">歌单</Menu.Item>
            <Menu.Item key="radio">主播电台</Menu.Item>
            <Menu.Item key="rank">排行榜</Menu.Item>
            <Menu.Item key="singer">歌手</Menu.Item>
          </Menu>
        </Affix>
        <Switch>
          <Route path="/found/recommend" component={Recommend} />
          <Route path="/found/songlist" component={SongList} />
          <Redirect to="/found/recommend" />
        </Switch>
      </div>
    )
  }
}
