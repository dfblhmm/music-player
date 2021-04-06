import { PureComponent, Fragment } from 'react'
import { Link, RouteComponentProps, withRouter } from 'react-router-dom'
import { Row, Col } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import logo from '@assets/images/logo.png'
import style from './index.module.scss'
class HeaderContainer extends PureComponent<RouteComponentProps> {
  state = {
    routerLength: this.props.history.length,
    go: false,
    back: false,
    routes: [this.props.location.pathname]
  }
  componentDidMount() {
    const { history: { listen } } = this.props
    listen(() => this.routeChange())
  }
  // 路由后退
  back = () => {
    const { history: { goBack } } = this.props
    goBack()
    this.setState({ go: true })
  }
  // 路由前进
  forward = () => {
    const { history: { goForward } } = this.props
    goForward()
  }
  // 路由发生改变
  routeChange() {
    const { history: { length }, location: { pathname } } = this.props
    if (length > this.state.routerLength) this.setState({ back: true })
    const { routes } = this.state
    if (pathname === routes[routes.length - 1]) this.setState({ go: false })
    if (!routes.includes(pathname)) routes.push(pathname)
    this.setState({ go: false, routes: [...routes] })
  }
  // 路由导航类名
  navigationClass = (direction: string): string => {
    const { go, back } = this.state
    if (direction === 'back') {
      return back ? (style.icon + ' ' + style['open-navigation']) : style.icon 
    } else {
      return go ? (style.icon + ' ' + style['open-navigation']) : style.icon 
    }
  }
  render() {
    const { navigationClass } = this
    return (
      <Fragment>
        <Row>
          <Col span={4} className={style.col} >
            <Link to="/" className={style['logo-link']}>
              <img src={logo} alt=""/>
              <span>网易云音乐</span>
            </Link>
            <div className={style['router-navigation']} >
              <LeftOutlined className={navigationClass('back')}
                title="后退" onClick={this.back} />
              <RightOutlined className={navigationClass('go')}
                title="前进" onClick={this.forward} />
            </div>
          </Col>
          <Col span={8} offset={4}>col-8</Col>
          <Col span={8}>col-8</Col>
        </Row>
      </Fragment>
    )
  }
}

export default withRouter(HeaderContainer)