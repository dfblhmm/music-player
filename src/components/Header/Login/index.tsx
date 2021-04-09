import { Fragment, PureComponent } from 'react'
import { Modal } from 'antd'
import EwmLogin from './EwmLogin'
import PhoneLogin from './PhoneLogin'
interface LoginProps extends LoginSuccessProps{
  close: () => void // 对话框关闭时的回调
  visible: boolean // 是否显示对话框
}
interface LoginType {
  type: number // 0表示二维码登录，1表示手机登录
}
export default class Login extends PureComponent<LoginProps, LoginType> {
  state = {
    type: 0 // 0代表二维码登录，1代表手机号登录
  }
  // 关闭对话框
  close = () => {
    this.props.close()
  }
  // 切换登录方式
  changeLoginType = (type: number) => {
    console.log(type)
    this.setState({ type })
  }
  render() {
    const { visible, loginSuccess } = this.props
    const { type } = this.state
    return (
      <Fragment>
        <Modal visible={visible} mask={false} footer={null} centered 
          width={352} onCancel={this.close} destroyOnClose>
            {
               type === 0 ? 
                <EwmLogin loginSuccess={loginSuccess} changeLoginType={this.changeLoginType} />
                : <PhoneLogin /> 
            }
        </Modal>
      </Fragment>
    )
  }
}
