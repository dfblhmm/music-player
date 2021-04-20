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
interface onPlayInfoType extends AlbumType{
  id: number // 歌曲id
  src: string // 歌曲地址
  duration: number // 歌曲时长
}
interface AlbumType {
  picUrl: string // 歌曲专辑图
  artists: Array<Artist> // 歌手
  name: string // 歌曲名
  alias: string // 歌曲来源
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