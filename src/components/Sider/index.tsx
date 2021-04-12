import { PureComponent, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Menu, Collapse } from 'antd'
import { CaretRightOutlined } from '@ant-design/icons'
// 获取IconFont字体图标
import IconFont from '@components/IconFont'
import './index.scss'
const { Panel } = Collapse
interface IProps {
  loginInfo: LoginType
}
class SiderContainer extends PureComponent<IProps> {
  // 点击了导航条
  handleMenuClick = (e: {key: unknown}) => {
    console.log(e.key)
  }
  // 获取用户歌单
  async getUserSonglist() {
    
  }
  // 创建的歌单
  createdSonglist(): JSX.Element {
    const { isLogin, uid } = this.props.loginInfo
    console.log(isLogin, uid)
    if (!isLogin) return (<></>)
    this.getUserSonglist()
    return (
      <p className="collapse-item"><IconFont type="icon-songlist" />1</p>
    )
  }
  render() {
    return (
      <Fragment>
        <Menu
          style={{ width: 224, marginTop: '10px' }}
          defaultSelectedKeys={['found']} mode="inline"
          onClick={this.handleMenuClick}
        >
          <Menu.Item key="found"><Link to="/found">发现音乐</Link></Menu.Item>
          <Menu.Item key="video"><Link to="/video">视频</Link></Menu.Item>
          <Menu.Item key="friends"><Link to="/friends">朋友</Link></Menu.Item>
          <Menu.Item key="fm"><Link to="/fm">私人FM</Link></Menu.Item>
          <li className="title">我的音乐</li>
          <Menu.Item key="my-cloud">
            <Link to="/my-cloud" style={{ fontWeight: 'normal', fontSize: '14px' }}>
              <IconFont type="icon-cloud" />我的音乐云盘
            </Link>
          </Menu.Item>
          <Menu.Item key="my-radio">
            <Link to="/my-radio" style={{ fontWeight: 'normal', fontSize: '14px' }}>
              <IconFont type="icon-radio" />我的电台
            </Link>
          </Menu.Item>
          <Menu.Item key="my-collection">
            <Link to="my-collection" style={{ fontWeight: 'normal', fontSize: '14px' }}>
              <IconFont type="icon-collection" />我的收藏
            </Link>
          </Menu.Item>
        </Menu>
        <Collapse ghost expandIconPosition="right" style={{marginTop: '10px'}}
          expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
          >
          <Panel header="创建的歌单" key="1">
            <p className="collapse-item"><IconFont type="icon-like" />我喜欢的音乐</p>
            {this.createdSonglist()}
          </Panel>
          <Panel header="创建的歌单" key="2">
            <p className="collapse-item"><IconFont type="icon-songlist" />1</p>
          </Panel>
        </Collapse>
      </Fragment>
    )
  }
}

const mapStateToProps = (state: GlobalState) => {
  const { loginInfo } = state
  return { loginInfo }
}
export default connect(
  mapStateToProps
)(SiderContainer)
