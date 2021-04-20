interface Action<T> {
  type: string
  data: T
}
// 登录状态
interface LoginType {
  isLogin: boolean // 登录状态
  uid: number // 用户id
}
// 付费方式
type ChargeType = {
  rate: 128000 | 192000 | 320000 | 999000 | 0,
  chargeType: 0 | 1
}
// 试听片段
type freeTrialInfoType = {
  start: number,
  end: number
} 
// 歌曲信息
interface onPlayInfoType extends AlbumType {
  id: number // 歌曲id
  src: string // 歌曲地址
  duration: number // 歌曲时长
  chargeInfoList: Array<ChargeType> // 付费方式
  freeTrialInfo?: freeTrialInfoType // 试听片段
  isVip: boolean // 是否为付费
}
interface AlbumType {
  picUrl: string // 歌曲专辑图
  artists: Array<Artist> // 歌手
  name: string // 歌曲名
  alias: string // 歌曲来源
  isVip: boolean // 是否付费
  freeTrialInfo?: freeTrialInfoType // 是否可以试听
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