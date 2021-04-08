import { PureComponent, Fragment } from 'react'
import { Link, RouteComponentProps, withRouter } from 'react-router-dom'
import { Row, Col, Avatar } from 'antd'
import { LeftOutlined, RightOutlined, CaretDownOutlined } from '@ant-design/icons'
import Search from './Search'
import Login from './Login'
import logo from '@assets/images/logo.png'
import style from './index.module.scss'
class HeaderContainer extends PureComponent<RouteComponentProps> {
  state = {
    visible: false
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
  render() {
    const { visible } = this.state
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
          <Col span={8} offset={4} className={style.col}><Search /></Col>
          <Col span={8} className={style.col}>
            <Avatar size={28} style={{cursor: 'pointer'}} />
            <span className={style.username}  >
              未登录<CaretDownOutlined style={{marginLeft: '3px'}} />
            </span>
            <Login visible={visible} />
          </Col>
        </Row>
      </Fragment>
    )
  }
}

export default withRouter(HeaderContainer)