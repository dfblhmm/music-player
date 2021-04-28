import { UPDATE_PLAY_INFO } from '../constant'
import store from '../store'
import { addToList } from './playList'
import http from '@utils/http'
type DisPatch = typeof store.dispatch
const updatePlayInfoHandle = (data: onPlayInfoType): Action<onPlayInfoType> => {
  return { type: UPDATE_PLAY_INFO, data }
}
const getSong = (id: number): onPlayInfoType | null => {
  const { playList } = store.getState()
  let index = playList.findIndex(value => value.id === id)
  if (index === -1) return null
  return playList[index].songInfo
}
interface Detail  {
  id: 0, // 歌曲id
  dt: 0, // 歌曲时长
  al: { picUrl: string }, // 歌曲专辑图
  ar: [], // 歌手
  name: string, // 歌曲名
  alia: Array<string> // 歌曲来源
  mv: number
  fee: number // 1代表试听
}
interface Privileges {
  chargeInfoList: Array<ChargeType> // 付费方式
  cs: boolean // 是否为云盘歌曲
  maxbr: number // 最大码率
}
export const updatePlayInfo = (id: number, song?: onPlayInfoType) => {
  return async(dispatch: DisPatch) => {
    if (song) return dispatch(updatePlayInfoHandle(song)) 
    const info = id && getSong(id)
    if (info) return dispatch(updatePlayInfoHandle(info))
    const res = await http('/song/detail', { ids: id })
    const detail: Detail = res.songs[0]
    const { chargeInfoList, cs, maxbr } = res.privileges[0] as Privileges
    const duration = Math.floor(detail.dt / 1000)
    const { name, al: { picUrl }, ar, alia, mv, fee } = detail
    const songInfo: onPlayInfoType = { 
      id, name, artists: ar, 
      picUrl: picUrl + '?param=x55y55', alias: alia[0],
      chargeInfoList, freeTrialInfo: fee === 1, 
      isVip: chargeInfoList[0]?.chargeType === 1,
      cs, maxbr, mv, duration
    }
    // 更新当前播放歌曲信息
    dispatch(updatePlayInfoHandle(songInfo))
    // 将当前歌曲添加到播放列表
    dispatch(addToList({ id, songInfo }))
  }
}