// import { UPDATE_PLAY_INFO, RESET_PLAY_INFO } from '../constant'
import { UPDATE_PLAY_INFO } from '../constant'
import store from '../store'
import { addToList } from './playList'
import http from '@utils/http'
type DisPatch = typeof store.dispatch
// 更新当前播放信息
const updatePlayInfoHandle = (data: onPlayInfoType): Action<onPlayInfoType> => {
  return { type: UPDATE_PLAY_INFO, data }
}
// 清空当前播放信息
// const resetPlayInfo = (): Action<null> => ({ type: RESET_PLAY_INFO, data: null }) 

// 检测当前歌曲是否已经加载过
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

export const updatePlayInfo = (id: number) => {
  return async(dispatch: DisPatch) => {
    const info = id && getSong(id)
    // 当前歌曲信息是否已加载
    if (info) return dispatch(updatePlayInfoHandle(info))
    const res = await http('/song/detail', { ids: id })
    const detail: Detail = res.songs[0]
    const { chargeInfoList, cs, maxbr } = res.privileges[0] as Privileges
    const duration = Math.floor(detail.dt / 1000)
    const { name, al: { picUrl }, ar, alia, mv, fee } = detail
    // 获取歌曲信息
    const songInfo: onPlayInfoType = { 
      id, name, artists: ar, cs, maxbr, mv, duration,
      picUrl: picUrl + '?param=x55y55', alias: alia[0],
      chargeInfoList, freeTrialInfo: fee === 1, 
      isVip: chargeInfoList[0]?.chargeType === 1,
    }
    // 更新当前播放歌曲信息
    dispatch(updatePlayInfoHandle(songInfo))
    // 将当前歌曲添加到播放列表
    dispatch(addToList({ id, songInfo }))
  }
}