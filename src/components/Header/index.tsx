import { PureComponent, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'antd'
import logo from 'assets/images/logo.png'
import './index.scss'
export default class HeaderContainer extends PureComponent {
  render() {
    return (
      <Fragment>
        <Row>
          <Col span={3}>
            <Link to="/" className="logo-link">
              <img src={logo} alt=""/>
              <span>网易云音乐</span>
            </Link>
          </Col>
          <Col span={8} offset={5}>col-8</Col>
          <Col span={8}>col-8</Col>
        </Row>
      </Fragment>
    )
  }
}
