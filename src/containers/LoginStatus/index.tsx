import { ComponentType } from 'react'
import { connect } from 'react-redux'
const mapStateToProps = (state: GlobalState) => {
  const { loginStatus } = state
  return { loginStatus }
}
export default function LoginStatus(Component: ComponentType<any>) {
  return connect(mapStateToProps)(Component)
}