import { UPDATEPLAYINFO } from '../constant'
const initState: onPlayInfoType = {
  id: 0, // 歌曲id
  src: '', // 歌曲地址
  duration: 0, // 歌曲时长
  picUrl: '', // 歌曲专辑图
  artists: [], // 歌手
  name: '', // 歌曲名
  alias: '', // 歌曲来源
  chargeInfoList: [], // 付费方式
  isVip: false
}
export default function onPlayInfo(preState = initState, action: Action<onPlayInfoType>): onPlayInfoType {
  const { type, data } = action
  if (type !== UPDATEPLAYINFO) return preState
  return data
}