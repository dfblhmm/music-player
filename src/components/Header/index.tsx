import { PureComponent, Fragment } from 'react'
import { Link, RouteComponentProps, withRouter } from 'react-router-dom'
import { Row, Col } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import logo from '@assets/images/logo.png'
import style from './index.module.scss'
class HeaderContainer extends PureComponent<RouteComponentProps> {
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
          <Col span={8} offset={4}>
            
          </Col>
          <Col span={8}>col-8</Col>
        </Row>
      </Fragment>
    )
  }
}

export default withRouter(HeaderContainer)