import { ComponentType } from 'react'
import { connect } from 'react-redux'
type TypeOfState = {
  loginStatus: LoginType
}
const mapStateToProps = (state: GlobalState) => {
  const { loginStatus } = state
  return { loginStatus }
}
export default function LoginStatus(Component: ComponentType<any>) {
  return connect<TypeOfState, any,any,any>(mapStateToProps)(Component)
}