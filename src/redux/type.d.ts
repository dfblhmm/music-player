interface Action<T> {
  type: string
  data: T
}
// 登录状态
interface LoginType {
  isLogin: boolean // 登录状态
  uid: number // 用户id
}

// 全局状态
interface GlobalState {
  loginInfo: LoginType
}