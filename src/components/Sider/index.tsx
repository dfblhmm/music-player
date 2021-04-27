import { PureComponent, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Collapse } from 'antd'
import { CaretRightOutlined } from '@ant-design/icons'
import LoginStatus, { TypeOfState } from '@containers/LoginStatus'
import http from '@utils/http'
import IconFont from '@components/IconFont'
import './index.scss'
const { Panel } = Collapse
interface IState {
  createdSonglist: Array<ItemType>
  collectedSonglist: Array<ItemType>
}
interface Playlist extends ItemType {
  userId: number
}
class SiderContainer extends PureComponent<TypeOfState, IState> {
  state: IState = {
    createdSonglist: [],
    collectedSonglist: [],
  }
  componentDidUpdate(prevProps: TypeOfState) {
    const prevLogin = prevProps.loginStatus.isLogin
    const login = this.props.loginStatus.isLogin
    if (prevLogin === login) return
    login && this.getUserSonglist(this.props.loginStatus.uid)
    !login && this.setState({ createdSonglist: [], collectedSonglist: [] })
  }
  // 点击了导航条
  handleMenuClick = async(e: {key: unknown}) => {
    console.log(e.key)
  }
  // 获取用户歌单
  async getUserSonglist(uid: number) {
    const { playlist } = await http('/user/playlist', { uid }) as { playlist: Array<Playlist> }
    playlist.splice(0, 1)
    const createdSonglist = playlist.filter(value => value.userId === uid)
    const collectedSonglist = playlist.filter(value => value.userId !== uid)
    this.setState({ createdSonglist, collectedSonglist })
  }
  // 用户歌单
  createdSonglist(type: string): JSX.Element {
    const { isLogin } = this.props.loginStatus
    if (!isLogin) return (<></>)
    let list: Array<ItemType> = []
    if (type === 'create') list = this.state.createdSonglist
    else list = this.state.collectedSonglist
    return (
      <Fragment>
        {
          list.map(value => 
            <p className="collapse-item" key={value.id} title={value.name}>
              <IconFont type="icon-songlist" />{value.name}
            </p>
          )
        }
      </Fragment>
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
        <Collapse ghost expandIconPosition="right" style={{marginTop: '10px'}} defaultActiveKey={['1']}
          expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
          >
          <Panel header="创建的歌单" key="1">
            <p className="collapse-item"><IconFont type="icon-like" />我喜欢的音乐</p>
            {this.createdSonglist('create')}
          </Panel>
          <Panel header="创建的歌单" key="2">
            {this.createdSonglist('collect')}
          </Panel>
        </Collapse>
      </Fragment>
    )
  }
}

export default LoginStatus(SiderContainer)