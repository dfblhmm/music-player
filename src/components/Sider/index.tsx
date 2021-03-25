import React, { Component, Fragment } from 'react'
import { Menu } from 'antd'
import './index.scss'
// 获取IconFont字体图标
import IconFont from 'components/IconFont'
const { SubMenu } = Menu
export default class SiderContainer extends Component {
  render() {
    return (
      <Fragment>
        <Menu style={{ width: 224, marginTop: '10px' }} defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1">发现音乐</Menu.Item>
          <Menu.Item key="2">视频</Menu.Item>
          <Menu.Item key="3">朋友</Menu.Item>
          <Menu.Item key="4">私人FM</Menu.Item>
          <li className="title">我的音乐</li>
          <Menu.Item key="5" style={{fontWeight: 'normal', fontSize: '14px'}}>
            <IconFont type="icon-cloud"/>我的音乐云盘
          </Menu.Item>
          <Menu.Item key="6" style={{fontWeight: 'normal', fontSize: '14px'}}>
            <IconFont type="icon-radio"/>我的电台
          </Menu.Item>
          <Menu.Item key="7" style={{fontWeight: 'normal', fontSize: '14px'}}>
            <IconFont type="icon-collection"/>我的收藏
          </Menu.Item>
          {/* <SubMenu key="sub1" title="创建的歌单">
            <Menu.Item key="8">创建的歌单</Menu.Item>
            <Menu.Item key="9">收藏的歌单</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" title="收藏的歌单">
            <Menu.Item key="10">创建的歌单</Menu.Item>
            <Menu.Item key="11">收藏的歌单</Menu.Item>
          </SubMenu> */}
        </Menu>
      </Fragment>
    )
  }
}
