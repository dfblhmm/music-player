import { ComponentType } from 'react'
import { connect } from 'react-redux'
interface IProps {
  loginInfo: LoginType
}
const mapStateToProps = (state: GlobalState) => {
  const { loginInfo } = state
  return { loginInfo }
}
const LoginStatus = (Component: ComponentType) => {
  return connect(mapStateToProps)(Component)
}
export default LoginStatus