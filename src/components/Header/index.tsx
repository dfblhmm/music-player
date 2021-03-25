import React, { Component, Fragment } from 'react'
import { Row, Col } from 'antd'
import logo from 'assets/images/logo.png'
export default class HeaderContainer extends Component {
  render() {
    return (
      <Fragment>
        <Row>
          <Col span={8}>
            <img src={logo} alt=""/>
          </Col>
          <Col span={8}>col-8</Col>
          <Col span={8}>col-8</Col>
        </Row>
      </Fragment>
    )
  }
}
