import { PureComponent, Fragment } from 'react'
import { Link, RouteComponentProps, withRouter } from 'react-router-dom'
import { Row, Col, Avatar, message } from 'antd'
import { LeftOutlined, RightOutlined, CaretDownOutlined } from '@ant-design/icons'
import http from '@/utils/http'
import Search from './Search'
import Login from './Login'
import logo from '@assets/images/logo.png'
import style from './index.module.scss'
interface StateType {
  visible: boolean
  accountInfo: { avatarUrl: string, nickname: string, userId: number },
  loginStatus: boolean
}
class HeaderContainer extends PureComponent<RouteComponentProps, StateType> {
  state = {
    visible: false,
    accountInfo: { avatarUrl: '', nickname: '', userId: 0 },
    loginStatus: false
  }
  async componentDidMount() {
    const res = await http('/login/status', { timerstamp: Date.now() })
    const profile: StateType['accountInfo'] | null = res.data.profile
    // 未登录 
    if (!profile) return message.warning('您还未登录~~~')
    // 已登录
    this.getUserInfo(profile)
  }
  // 前进按钮
  forward = () => {
    const { history: { goForward } } = this.props
    goForward()
  }
  // 后退按钮
  back = () => {
    const { history: { goBack } } = this.props
    goBack()
  }
  // 获取登录信息
  getUserInfo(profile: StateType['accountInfo']) {
    const { avatarUrl, nickname, userId } = profile
    this.setState({ 
      accountInfo: { avatarUrl: avatarUrl + '?param=x28y28', nickname, userId },
      loginStatus: true, visible: false 
    })
  }
  // 登录成功，获取用户信息
  loginSuccess = async () => {
    const res = await http('/user/account')
    const profile: StateType['accountInfo'] = res.profile
    message.success(`${profile.nickname}，欢迎回来`)
    this.getUserInfo(profile)
  }
  // 点击用户名
  clickUserName = () => {
    const { loginStatus } = this.state
    if (!loginStatus) this.setState({ visible: true })
  }
  // 关闭对话框
  closeModal = () => {
    this.setState({ visible: false })
  }
  render() {
    const { visible, accountInfo: { avatarUrl, nickname } } = this.state
    return (
      <Fragment>
        <Row>
          <Col span={4} className={style.col} >
            <Link to="/" className={style['logo-link']}>
              <img src={logo} alt=""/>
              <span>网易云音乐</span>
            </Link>
            <div className={style['router-navigation']} >
              <LeftOutlined className={style['icon']}
                title="后退" onClick={this.back} />
              <RightOutlined className={style.icon}
                title="前进" onClick={this.forward} />
            </div>
          </Col>
          <Col span={9} offset={4} className={style.col}><Search /></Col>
          <Col span={7} className={style.col}>
            <Avatar size={28} style={{cursor: 'pointer'}} src={avatarUrl} />
            <span className={style.username} onClick={this.clickUserName} >
              {nickname ? nickname : '未登录'}<CaretDownOutlined style={{marginLeft: '3px'}} />
            </span>
            <Login visible={visible} loginSuccess={this.loginSuccess} close={this.closeModal} />
          </Col>
        </Row>
      </Fragment>
    )
  }
}

export default withRouter(HeaderContainer)