interface Action<T> {
  type: string
  data: T
}
// 登录状态
interface LoginType {
  isLogin: boolean // 登录状态
  uid: number // 用户id
}
// 歌曲信息
interface onPlayInfoType {
  id: number // 歌曲id
  src: string // 歌曲地址
  duration: number // 歌曲时长
}
interface PlayListType {
  id: number
  songInfo: onPlayInfoType
}
// 全局状态
interface GlobalState {
  loginInfo: LoginType,
  onPlayInfo: onPlayInfoType
  playList: Array<PlayListType>
}