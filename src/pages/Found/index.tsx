import { PureComponent, Fragment, lazy } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import { Menu } from 'antd'
import './index.scss'
const Recommend = lazy(() => import('./Recommend'))
export default class Found extends PureComponent {
  state = {
    selectedKeys: ['recommend'] // 当前选中的菜单项
  }
  // 切换菜单选项
  handleClick = (e: { key: unknown }) => {
    this.setState({selectedKeys: [e.key as string]})
  }
  render() {
    const { selectedKeys } = this.state
    return (
      <Fragment>
        <Menu selectedKeys={selectedKeys} mode="horizontal" onClick={this.handleClick}>
          <Menu.Item key="recommend">个性推荐</Menu.Item>
          <Menu.Item key="songlist">歌单</Menu.Item>
          <Menu.Item key="radio">主播电台</Menu.Item>
          <Menu.Item key="rank">排行榜</Menu.Item>
          <Menu.Item key="singer">歌手</Menu.Item>
        </Menu>
        <Switch>
          <Route path="/found/recommend" component={Recommend} />
          <Redirect to="/found/recommend" />
        </Switch>
      </Fragment>
    )
  }
}
