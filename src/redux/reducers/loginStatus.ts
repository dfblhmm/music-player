import { LOGINSTATUS } from '../constant'
// import http from '@utils/http'
const initState = {
  isLogin: false,
  uid: 0
}
// const init = async() => {
//   const res = await http('/login/status')
//   console.log(res)
//   const profile: LoginType | null = res.data.profile
//   // 未登录 
//   if (!profile) return message.warning('您还未登录~~~')
// }
// init()
export default function login(preState = initState, action: Action<LoginType>): LoginType {
  const { type, data } = action
  if (type === LOGINSTATUS) return data
  return preState
}