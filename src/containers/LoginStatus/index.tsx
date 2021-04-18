import { ComponentProps } from 'react'
import { connect } from 'react-redux'
const mapStateToProps = (state: GlobalState) => {
  const { loginInfo } = state
  return { loginInfo }
}
export default function LoginStatus(Component: ComponentProps<any>) {
  return connect(mapStateToProps)(Component)
}