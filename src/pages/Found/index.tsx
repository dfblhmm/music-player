import { PureComponent, lazy, Fragment } from 'react'
import { Route, Redirect, Switch, RouteComponentProps } from 'react-router-dom'
import { Menu, Affix } from 'antd'
import target from '@components/Main/context'
import './index.scss'
const Recommend = lazy(() => import('./Recommend'))
const SongList = lazy(() => import('./SongList'))
export default class Found extends PureComponent<RouteComponentProps> {
  static contextType = target
  state = {
    selectedKeys: ['/found/recommend'], // 当前选中的菜单项
  }
  componentDidMount() {
    // 页面加载完或页面刷新后及时确定当前对应的菜单项
    const { location: { pathname }, history: { listen } } = this.props
    this.updateMenuItem(pathname)
    listen(location => this.updateMenuItem(location.pathname))
  }
  // 更新当前菜单项
  updateMenuItem(pathname: string) {
    if (pathname === '/found') return this.setState({selectedKeys: ['/found/recommend']})
    if (pathname.includes('songlist')) return this.setState({selectedKeys: ['/found/songlist']})
    this.setState({selectedKeys: [pathname]})
  }
  componentWillUnmount() {
    this.updateMenuItem = () => undefined
  }
  // 切换菜单选项
  handleClick = (e: { key: unknown }) => {
    const key = e.key as string
    const { history: { push }, location: { pathname } } = this.props
    if (key === pathname) return
    push(`${key}`)
    this.setState({selectedKeys: [key]})
  }
  render() {
    const { selectedKeys } = this.state
    return (
      <Fragment>
        <Affix offsetTop={0} target={() => this.context}>
          <Menu selectedKeys={selectedKeys} mode="horizontal" onClick={e => this.handleClick(e)}>
            <Menu.Item key="/found/recommend">个性推荐</Menu.Item>
            <Menu.Item key="/found/songlist">歌单</Menu.Item>
            <Menu.Item key="/found/radio">主播电台</Menu.Item>
            <Menu.Item key="/found/rank">排行榜</Menu.Item>
            <Menu.Item key="/found/singer">歌手</Menu.Item>
            <Menu.Item key="/found/new-songs">最新音乐</Menu.Item>
          </Menu>
        </Affix>
        <Switch>
          <Route path="/found/recommend" component={Recommend} />
          <Route path="/found/songlist" component={SongList} />
          <Redirect to="/found/recommend" />
        </Switch>
      </Fragment>
    )
  }
}
