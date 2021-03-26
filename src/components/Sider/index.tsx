import { Component, Fragment } from 'react'
import { Menu, Collapse } from 'antd'
import './index.scss'
// 获取IconFont字体图标
import IconFont from 'components/IconFont'
import { CaretRightOutlined } from '@ant-design/icons'
const { Panel } = Collapse
export default class SiderContainer extends Component {
  render() {
    return (
      <Fragment>
        <Menu
          style={{ width: 224, marginTop: '10px' }}
          defaultSelectedKeys={['1']}
          mode="inline"
        >
          <Menu.Item key="1">发现音乐</Menu.Item>
          <Menu.Item key="2">视频</Menu.Item>
          <Menu.Item key="3">朋友</Menu.Item>
          <Menu.Item key="4">私人FM</Menu.Item>
          <li className="title">我的音乐</li>
          <Menu.Item key="5" style={{ fontWeight: 'normal', fontSize: '14px' }}>
            <IconFont type="icon-cloud" />我的音乐云盘
          </Menu.Item>
          <Menu.Item key="6" style={{ fontWeight: 'normal', fontSize: '14px' }}>
            <IconFont type="icon-radio" />我的电台
          </Menu.Item>
          <Menu.Item key="7" style={{ fontWeight: 'normal', fontSize: '14px' }}>
            <IconFont type="icon-collection" />我的收藏
          </Menu.Item>
        </Menu>
        <Collapse ghost expandIconPosition="right" style={{marginTop: '10px'}}
          expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
          >
          <Panel header="创建的歌单" key="1">
            <p className="collapse-item"><IconFont type="icon-like" />我喜欢的音乐</p>
            <p className="collapse-item"><IconFont type="icon-songlist" />1</p>
          </Panel>
          <Panel header="创建的歌单" key="2">
            <p className="collapse-item"><IconFont type="icon-songlist" />1</p>
          </Panel>
        </Collapse>
      </Fragment>
    )
  }
}
