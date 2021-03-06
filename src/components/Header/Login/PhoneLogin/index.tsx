import { PureComponent } from 'react'
import { Input, Button, Image, message } from 'antd'
import http from '@utils/http'
import IconFont from '@components/IconFont'
import ewm from '@assets/images/ewm.png'
import phoneTip from '@assets/images/phone_tip.png'
import style from './index.module.scss'
interface Props extends LoginSuccessProps {
  changeLoginType: (type: number) => void
}
interface State {
  validateTip: string,
  type: number // 0代表登录，1代表注册，2代表重设密码，3代表获取验证码界面
  btnTitle: string
  captchaType: number // 验证类型，1代表注册验证，2代表修改密码验证
}
export default class PhoneLogin extends PureComponent<Props, State> { 
  phone!: Input | null
  password!: Input | null
  timer!: number | null
  captcha?: Input | null
  state = {
    validateTip: '',
    type: 0,
    btnTitle: '获取验证码',
    captchaType: 0
  }
  // 登录
  login = async () => {
    const phone = this.phone!.input.value
    const password = this.password!.input.value
    const phoneValidate = await this.validatePhone(phone)
    if (!phoneValidate) return // 手机号检验未通过
    // 手机号校验通过，开始校验密码
    if (!this.validatePassword(password)) return
    // 手机号和密码校验都通过，发起登录请求
    const res = await http('/login/cellphone', { phone, password }, 'POST')
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
    const { type } = this.state
    if (exist !== 1 && !type) return this.setState({ validateTip: '该手机号尚未注册' })
    if (exist === 1 && type === 1) return this.setState({ validateTip: '该手机号已经注册' })
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
  // 忘记密码
  resetPassword = () => {
    this.setState({ validateTip: '', type: 2 })
  }
  // 表单聚焦
  focus = () => {
    this.setState({ validateTip: '' })
  }
  // 验证提示
  validate(): JSX.Element {
    const { type, validateTip } = this.state
    if (!type) return (<span onClick={this.resetPassword}>忘记密码?</span>)
    const display: string = validateTip ? 'none' : 'flex'
    return (
      <div className={style.validateTip} style={{display}} >
        密码8-20位，至少包含字母/数字/字符2种组合
      </div>
    )
  }
  // 功能按钮
  btn(): JSX.Element {
    const { type } = this.state
    const { login, register, verifyCaptcha } = this
    switch (type) {
      case 1:
        return (<Button type="primary" className={style.btn} onClick={()=>register(type)}>注册</Button>)
      case 2: 
        return (<Button type="primary" className={style.btn} onClick={()=>register(type)}>下一步</Button>)
      case 3:
        return (<Button type="primary" className={style.btn} onClick={verifyCaptcha}>完成</Button>)
      default:
        return (<Button type="primary" className={style.btn} onClick={login}>登录</Button>)
    }
  }
  // 注册
  register = async(captchaType: number) => {
    const phone = this.phone!.input.value
    const password = this.password!.input.value
    const phoneValidate =  await this.validatePhone(phone)
    if (!phoneValidate) return
    if (!this.validatePassword(password)) return
    // 手机号验证和密码验证都通过，跳转至验证码界面
    this.setState({ type: 3, validateTip: '', captchaType })
  }
  // 验证验证码
  verifyCaptcha = async() => {
    const captcha = this.captcha!.input.value
    const phone = this.phone!.input.value
    const res = await http('/captcha/verify', { phone, captcha }, 'POST')
    if (res.data) {
      const { captchaType } = this.state
      captchaType === 1 && message.success('注册成功')
      captchaType === 2 && message.success('密码修改成功')
      this.setState({ type: 0 })
    }
  }
  // 返回登录界面节点
  backToLoginNode(): JSX.Element {
    const { type } = this.state
    if (!type) return (<></>)
    return (
      <div className={style.back} onClick={this.backLogin} >&lt;&nbsp;返回登录</div>
    )
  }
  // 返回登录界面处理函数
  backLogin = () => {
    this.timer && window.clearInterval(this.timer)
    this.setState({ validateTip: '', type: 0 })
  }
  // 验证码
  captchaNode(): JSX.Element {
    const { type, btnTitle } = this.state
    if (type !== 3) return (<></>)
    return (
      <div className={style['captcha']}>
        <h2>为了安全，我们会向您的手机发送短信验证码</h2>
        <div className={style.code}>
          <Input prefix={<IconFont type="icon-key" />} size="small" ref={c => this.captcha = c} />
          <Button type="primary" onClick={this.getCaptcha} 
            className={style['code-btn']}>{btnTitle}</Button>
        </div>
      </div>
    )
  }
  // 获取验证码
  getCaptcha = async () => {
    // 获取验证码
    const phone = this.phone!.input.value
    const res = await http('/captcha/sent', { phone }, 'POST')
    if (!res.data) return message.error(res.message) // 验证码发送失败
    // 开启定时器
    this.setState({ btnTitle: '00:59' })
    this.timer = window.setInterval(() => this.setState(state => {
      return { btnTitle: this.formatTime(state.btnTitle) }
    }), 1000)
  }
  // 格式化时间
  formatTime(time: string): string {
    let second = parseInt(time.substr(3))
    if (!second) {
      window.clearInterval(this.timer!)
      return '重新获取'
    }
    second--
    return second >= 10 ? '00:' + second : '00:0' + second 
  }
  render() {
    const { changeLoginType } = this.props
    const { validateTip, type } = this.state
    return (
      <div className={style['phone-login-container']}>
        <div className={style.tip} style={{display: !type ? 'flex' : 'none'}} >
          <div className={style.tipIcon} onClick={() => changeLoginType(0)}>
            <Image src={ewm} preview={false} />
          </div>
          <div className={style.tipText}>扫码登录更安全<span></span></div>
        </div>
        {/* 返回登录界面 */}
        {this.backToLoginNode()}
        <div className={style['login-area']}>
          <Image src={phoneTip} preview={false}/>
          {/* 登录区域 */}
          <div className={style['login-form']}>
            <div className={style['input-container']} style={{ display: type!==3 ? 'block' : 'none' }} >
              <Input prefix={<IconFont type="icon-phone" />} onFocus={this.focus}
                allowClear placeholder="请输入手机号" bordered={false} ref={c => this.phone = c} />
              <Input.Password prefix={<IconFont type="icon-password"/>} ref={c => this.password = c}
                allowClear placeholder="请输入登录密码" bordered={false} onFocus={this.focus} />
            </div>
            {/* 获取验证码 */}
            {this.captchaNode()}
            {/* 表单校验提示 */}
            <div className={style['validate']} style={{display: type === 3 ? 'none' : 'flex'}} >
              {this.validate()}
              <div className={style['error-tip']} style={{display: validateTip ? 'block' : 'none'}}>
                <IconFont type="icon-warning" style={{marginRight: '2px', fontSize:'13px'}} />{validateTip}
              </div>
            </div>
            {/* 功能按钮 */}
            {this.btn()}
            <div className={style.register} style={{display: !type ? 'block' : 'none'}} >
              <span onClick={() => this.setState({ validateTip: '', type: 1 })}>注册</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
