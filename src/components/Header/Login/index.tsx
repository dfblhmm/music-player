import { Fragment, PureComponent } from 'react'
import { Modal } from 'antd'
import style from './index.module.scss'
import ewmTip from '@assets/images/ewm_tip.png'
import ewm from '@assets/images/ewm.png'

interface LoginProps {
  visible: boolean
}
export default class Login extends PureComponent<LoginProps> {
  // 扫码登录
  ewmLogin(): JSX.Element {
    return (
      <div className={style['ewm-login-container']}>
        <h1>扫码登录</h1>
        <div className={style.img}>
          <img src={ewmTip} alt="" />
          <img src={ewm} alt="" />
        </div>
        <div className={style.app}>使用<span>网易云音乐APP</span>扫码登录</div>
        <div className={style['other-loginType']}>选择其他登录方式&gt;</div>
      </div>
    )
  }
  render() {
    const { visible } = this.props
    return (
      <div>
        <Modal visible={visible} mask={false} footer={null} 
          centered width={352} >
          {this.ewmLogin()}
        </Modal>
      </div>
    )
  }
}
