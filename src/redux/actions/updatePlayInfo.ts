import { UPDATEPLAYINFO } from '../constant'
import store from '../store'
import { addToList } from './playList'
import http from '@utils/http'
const updatePlayInfoHandle = (data: onPlayInfoType): Action<onPlayInfoType> => {
  return { type: UPDATEPLAYINFO, data }
}
const getSong = (id: number): onPlayInfoType | null => {
  const { playList } = store.getState()
  let index = playList.findIndex(value => value.id === id)
  if (index === -1) return null
  return playList[index].songInfo
}
type Detail = {
  id: 0, // 歌曲id
  dt: 0, // 歌曲时长
  al: { picUrl: string }, // 歌曲专辑图
  ar: [], // 歌手
  name: string, // 歌曲名
  alia: Array<string> // 歌曲来源
}
type Privileges = {
  chargeInfoList: Array<ChargeType> // 付费方式
  pl: number
}
type urlDetail = {
  url: string,
  freeTrialInfo?: { start: number, end: number }
}
export const updatePlayInfo = (id: number, song?: onPlayInfoType) => {
  return async(dispatch: any) => {
    if (song) return dispatch(updatePlayInfoHandle(song)) 
    const info = id && getSong(id)
    if (info) return dispatch(updatePlayInfoHandle(info))
    const res = await http.all([
      { url: '/song/url', data: { id, timestamp: Date.now() } },
      { url: '/song/detail', data: { ids: id, timestamp: Date.now() } }
    ])
    const { url, freeTrialInfo } = res[0].data[0] as urlDetail
    const detail: Detail = res[1].songs[0]
    const { chargeInfoList, pl } = res[1].privileges[0] as Privileges
    const duration = Math.floor(detail.dt / 1000)
    const { name, al: { picUrl }, ar, alia } = detail
    const songInfo: onPlayInfoType = { 
      src: url, duration, id, name, artists: ar, 
      picUrl: picUrl + '?param=x55y55', alias: alia[0],
      chargeInfoList, freeTrialInfo, isVip: pl === 0
    }
    // 更新当前播放歌曲信息
    dispatch(updatePlayInfoHandle(songInfo))
    // 将当前歌曲添加到播放列表
    dispatch(addToList({ id, songInfo }))
  }
}