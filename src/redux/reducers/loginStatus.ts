import { LOGINSTATUS } from '../constant'
const initState = {
  isLogin: false,
  uid: 0
}
export default function login(preState = initState, action: Action<LoginType>): LoginType {
  const { type, data } = action
  if (type === LOGINSTATUS) return data
  return preState
}