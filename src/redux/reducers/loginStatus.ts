import { LOGIN, LOGIN_OUT } from '../constant'
const initState = {
  isLogin: false,
  uid: 0
}
export default function reducer(preState = initState, action: Action<LoginType>): LoginType {
  const { type, data } = action
  switch (type) {
    case LOGIN:
      return data
    case LOGIN_OUT:
      return initState
    default:
      return preState
  }
}