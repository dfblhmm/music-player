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
interface ChargeType {
  rate: 128000 | 192000 | 320000 | 999000 | 0,
  chargeType: 0 | 1
}

// 试听片段
interface freeTrialInfoType {
  start: number,
  end: number
} 

// 歌曲专辑图信息
interface AlbumType {
  picUrl: string // 歌曲专辑图
  artists: Array<Artist> // 歌手
  name: string // 歌曲名
  alias: string // 歌曲来源
  isVip: boolean // 是否付费
  freeTrialInfo: boolean // 是否可以试听
}
// 歌曲信息
interface onPlayInfoType extends AlbumType {
  id: number // 歌曲id
  chargeInfoList: Array<ChargeType> // 付费方式
  cs: boolean // 是否为云盘歌曲
  maxbr: number // 最大码率
  mv: number
  duration: number
}


interface PlayListType {
  id: number
  songInfo: onPlayInfoType
}

// 歌曲src及歌曲试听片段
interface MusicSource {
  id: number // 歌曲id
  url: string // 歌曲Src
  freeTrialInfo?: { start: number, end: number } // 歌曲试听片段
}

// 全局状态
interface GlobalState {
  loginStatus: LoginType,
  onPlayInfo: onPlayInfoType
  playList: Array<PlayListType>
  musicInfo: MusicSource
}