import { PureComponent } from 'react'
import { Form, Input, Button } from 'antd'
import http from '@utils/http'
import IconFont from '@components/IconFont'
import ewm from '@assets/images/ewm.png'
import phoneTip from '@assets/images/phone_tip.png'
import style from './index.module.scss'
interface Props extends LoginSuccessProps {
  changeLoginType: (type: number) => void
}
export default class PhoneLogin extends PureComponent<Props> {
  render() {
    const { changeLoginType } = this.props
    return (
      <div className={style['phone-login-container']}>
        <div className={style.tip}>
          <div className={style.tipIcon} onClick={() => changeLoginType(0)}>
            <img src={ewm} alt=""/>
          </div>
          <div className={style.tipText}>扫码登录更安全<span></span></div>
        </div>
        <div className={style['login-area']}>
          <img src={phoneTip} alt=""/>
          <Form name="normal_login" className={style['login-form']} initialValues={{ remember: true }}>
            <Form.Item name="phone" rules={[{ required: true, message: '手机号不能为空' }]}>
              <Input prefix={<IconFont type="icon-phone" />} placeholder="请输入手机号" />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: '密码不能为空' }]}>
              <Input prefix={<IconFont type="icon-password" />} type="password" placeholder="请输入密码" />
            </Form.Item>
            <Form.Item>
              <Button type="primary">登录</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}
