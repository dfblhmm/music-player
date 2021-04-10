import { PureComponent } from 'react'
import { Input, Button, Image } from 'antd'
import http from '@utils/http'
import IconFont from '@components/IconFont'
import ewm from '@assets/images/ewm.png'
import phoneTip from '@assets/images/phone_tip.png'
import style from './index.module.scss'
interface Props extends LoginSuccessProps {
  changeLoginType: (type: number) => void
}
interface State {
  validateTip: string
}
export default class PhoneLogin extends PureComponent<Props, State> { 
  phone!: Input | null
  password!: Input | null
  state = {
    validateTip: ''
  }
  // 登录
  login = async () => {
    const phone = this.phone!.input.value
    const password = this.password!.input.value
    const phoneStatus = await this.validatePhone(phone)
    if (!phoneStatus) return // 手机号检验未通过
    // 手机号校验通过，开始校验密码
    if (!this.validatePassword(password)) return
    // 手机号和密码校验都通过，发起登录请求
    const res = await http('/login/cellphone', { phone, password })
    // 密码错误
    if (res.code !== 200) return this.setState({ validateTip: '手机号或密码错误' })
    // 登录成功
    this.props.loginSuccess()
  }
  // 校验手机号
  async validatePhone(phone: string) {
    if (!phone.trim()) return this.setState({ validateTip: '手机号不能为空' })
    const phoneRegExp = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
    if (!phoneRegExp.test(phone)) return this.setState({ validateTip: '请输入合法的手机号' })
    // 检验手机号是否注册
    const res = await http('/cellphone/existence/check', { phone })
    const exist = res.exist // 是否已注册，1代表已注册，-1代表未注册
    if (exist !== 1) return this.setState({ validateTip: '该手机号尚未注册' })
    return true
  }
  // 校验密码
  validatePassword(password: string) {
    if (!password.trim()) return this.setState({ validateTip: '密码不能为空' })
    const passwordRegExp = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{8,20}$/
    if (!passwordRegExp.test(password)) {
      return this.setState({ validateTip: '密码8-20位，至少包含字母/数字/字符2种组合' })
    }
    return true
  }
  render() {
    const { changeLoginType } = this.props
    const { validateTip } = this.state
    return (
      <div className={style['phone-login-container']}>
        <div className={style.tip}>
          <div className={style.tipIcon} onClick={() => changeLoginType(0)}>
            <Image src={ewm} preview={false} />
          </div>
          <div className={style.tipText}>扫码登录更安全<span></span></div>
        </div>
        <div className={style['login-area']}>
          <Image src={phoneTip} preview={false}/>
          {/* 登录区域 */}
          <div className={style['login-form']}>
            <div className={style['input-container']}>
              <Input prefix={<IconFont type="icon-phone" />} 
                allowClear placeholder="请输入手机号" bordered={false} ref={c => this.phone = c} />
              <Input.Password prefix={<IconFont type="icon-password"/>} ref={c => this.password = c}
                allowClear placeholder="请输入登录密码" bordered={false} />
            </div>
            {/* 表单校验提示 */}
            <div className={style['validate']}>
              <div className={style['error-tip']} style={{display: validateTip ? 'block' : 'none'}}>
                <IconFont type="icon-warning" style={{marginRight: '2px', fontSize:'13px'}} />{validateTip}
              </div>
            </div>
            <Button type="primary" className={style['login-btn']} onClick={this.login}>登录</Button>
          </div>
        </div>
      </div>
    )
  }
}
