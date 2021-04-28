import { UPDATE_PLAY_INFO } from '../constant'
const initState: onPlayInfoType = {
  id: 0, // 歌曲id
  picUrl: '', // 歌曲专辑图
  artists: [], // 歌手
  name: '', // 歌曲名
  alias: '', // 歌曲来源
  chargeInfoList: [], // 付费方式
  isVip: false, // 是否vip
  cs: false, // 是否属于云盘
  maxbr: 0, // 最大码率
  mv: 0, // mvid
  freeTrialInfo: false, // 是否可以试听
  duration: 0
}
export default function onPlayInfo(preState = initState, action: Action<onPlayInfoType>): onPlayInfoType {
  const { type, data } = action
  if (type !== UPDATE_PLAY_INFO) return preState
  return data 
}