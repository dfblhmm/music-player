import { Fragment, PureComponent } from 'react'
import { Modal } from 'antd'
import http from '@utils/http'
import style from './index.module.scss'
import ewmTip from '@assets/images/ewm_tip.png'

interface LoginProps {
  loginSuccess: () => void
  close: () => void
}
interface StateType {
  ewmPic: string // 二维码Base64字符串
  valid: boolean // 当前二维码是否还有效
  type: number // 0表示二维码登录，1表示手机登录
}
export default class Login extends PureComponent<LoginProps, StateType> {
  timer?: number
  state = {
    ewmPic: '', // 二维码图片
    valid: false, // 二维码是否已有效
    type: 0
  }
  componentDidMount() {
    this.createEwm()
  }
  // 生成二维码
  async createEwm() {
    const keyData = await http('/login/qr/key', { timerstamp: Date.now() })
    const key: string = keyData.data.unikey // 获取登录key
    const res = await http('/login/qr/create', { key, qrimg: true, timerstamp: Date.now() })
    const ewmPic: string = res.data.qrimg // 获取登录二维码
    this.setState({ ewmPic, valid: true })
    this.timer = window.setInterval(() => this.checkScan(key), 3000)
  }
  // 检测扫码状态
  async checkScan(key: string) {
    const res = await http('/login/qr/check', { key, timerstamp: Date.now() })
    const code: number = res.code
    switch (code) {
      case 800: // 二维码过期
        this.setState({ valid: false })
        window.clearInterval(this.timer)
        break
      case 803: // 授权成功
        window.clearInterval(this.timer)
        this.props.loginSuccess()
        break
      default:
        break
    }
  }
  // 刷新二维码
  refreshEwm = () => {
    this.createEwm() // 生成新的二维码
    this.setState({ valid: true })
  }
  // 扫码登录
  ewmLogin(): JSX.Element {
    const { ewmPic, valid } = this.state
    return (
      <div className={style['ewm-login-container']}>
        <h1>扫码登录</h1>
        <div className={style.img}>
          <div className={style.tip}><img src={ewmTip} alt="" /></div>
          <div className={style.ewm}>
            <img src={ewmPic} alt="" />
            <div className={style.mask} style={{display: !valid ? 'flex' : 'none'}}>
              <h2>二维码已失效</h2><button onClick={this.refreshEwm}>点击刷新</button>
            </div>
          </div>
        </div>
        <div className={style.app}>使用<span>网易云音乐APP</span>扫码登录</div>
        <div className={style['other-loginType']}>选择其他登录方式&gt;</div>
      </div>
    )
  }
  // 关闭对话框
  close = () => {
    window.clearInterval(this.timer)
    this.props.close()
  }
  render() {
    return (
      <Fragment>
        <Modal visible={true} mask={false} footer={null} 
          centered width={352} onCancel={this.close} >
          {this.ewmLogin()}
        </Modal>
      </Fragment>
    )
  }
}
