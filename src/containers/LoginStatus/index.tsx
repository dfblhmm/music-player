import { ComponentType } from 'react'
import { connect } from 'react-redux'
import { login, loginOut } from '@redux/actions/loginStatus'
const mapStateToProps = (state: GlobalState) => {
  const { uid, isLogin } = state.loginStatus
  return { uid, isLogin }
}
const mapDispatchToProps = {
  login, loginOut
}
type TypeOfState = LoginType
export type TypeOfDispatch = typeof mapDispatchToProps
export default function LoginStatus<T>(Component: ComponentType<any>, changeable?: boolean) {
  if (changeable) {
    return connect<any, TypeOfDispatch, T, GlobalState>(null, mapDispatchToProps)(Component)
  }
  return connect<TypeOfState, any, T, GlobalState>(mapStateToProps)(Component)
} 